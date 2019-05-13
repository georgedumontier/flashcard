import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faPencilAlt,
  faArrowLeft,
  faHome,
  faRedo
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";
import AddNewCard from "./AddNewCard";
import { Link } from "react-router-dom";

class Deck extends React.Component {
  state = {
    showNewCard: false,
    cardIsFlipped: false,
    currentCard: 0,
    right: 0,
    wrong: 0
  };
  convertToLetter(percentageGrade) {
    if (percentageGrade > 94) {
      return "A+";
    } else if (percentageGrade > 89) {
      return "A";
    } else if (percentageGrade > 84) {
      return "B+";
    } else if (percentageGrade > 79) {
      return "B";
    } else if (percentageGrade > 74) {
      return "C+";
    } else if (percentageGrade > 69) {
      return "C";
    } else if (percentageGrade > 64) {
      return "D+";
    } else if (percentageGrade > 59) {
      return "D";
    } else if (percentageGrade < 60) {
      return "F";
    } else {
      return "";
    }
  }
  flipCard = () => {
    let cardIsFlipped = !this.state.cardIsFlipped;
    this.setState({
      cardIsFlipped
    });
  };
  answered = answer => {
    if (answer === "right") {
      let right = this.state.right + 1;
      this.setState({
        right
      });
    } else {
      let wrong = this.state.wrong + 1;
      this.setState({
        wrong
      });
    }
    let currentCard = this.state.currentCard;
    currentCard++;
    let cardIsFlipped = !this.state.cardIsFlipped;

    this.setState({
      currentCard,
      cardIsFlipped
    });
  };
  hideNewCard = () => {
    this.setState({
      showNewCard: false
    });
  };
  restart = e => {
    e.preventDefault();
    let state = this.state;
    state.right = 0;
    state.wrong = 0;
    state.cardIsFlipped = false;
    state.currentCard = 0;
    this.setState({
      state
    });
  };
  render() {
    let deckId = this.props.match.params.deckId;
    let deck = this.props.decks[deckId];
    if (!deck) {
      return <p>loading...</p>;
    }
    let cards;
    if (!deck.cards || deck.cards.length === 0) {
      cards = (
        <div className="no-cards">
          <p>No cards have been added to this deck.</p>
          <div className="button-wrapper">
            <button
              className="add-new-card-button"
              onClick={() => {
                this.setState({ showNewCard: true });
              }}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
              Edit
            </button>
          </div>
          <AddNewCard
            deleteCard={this.props.deleteCard}
            inProp={this.state.showNewCard}
            hideNewCard={this.hideNewCard}
            editCards={this.props.editCards}
            deck={this.props.decks[this.props.match.params.deckId]}
            deckId={this.props.match.params.deckId}
          />
        </div>
      );
    } else if (deck.cards && this.state.currentCard === deck.cards.length) {
      let percentageGrade = Math.floor(
        (this.state.right / this.state.currentCard) * 100
      );
      let letterGrade = this.convertToLetter(percentageGrade);
      return (
        <div className="results">
          <h1>Results</h1>
          <h2>You answered {percentageGrade}% of the cards correctly.</h2>
          <div className="letterGrade">
            <div className="grade-container">
              <h2>{letterGrade}</h2>
            </div>
          </div>
          <div className="done-buttons-wrapper">
            <Link to={`/${this.props.user}`}>
              <button className="back-home">
                <FontAwesomeIcon icon={faHome} /> Home
              </button>
            </Link>
            <button className="retry" onClick={e => this.restart(e)}>
              <FontAwesomeIcon icon={faRedo} /> Retry
            </button>
          </div>
        </div>
      );
    } else {
      cards = (
        <>
          <h2>{deck.title}</h2>
          <TransitionGroup component={null}>
            <CSSTransition
              timeout={300}
              classNames="fade"
              key={this.state.currentCard}
            >
              <div className="deck-view">
                <div
                  className={`card ${
                    this.state.cardIsFlipped ? "cardIsFlipped" : ""
                  }`}
                >
                  <div className="front-side" onClick={() => this.flipCard()}>
                    <h3>{deck.cards[`${this.state.currentCard}`][0]}</h3>
                  </div>
                  <div className="back-side">
                    <h3>{deck.cards[`${this.state.currentCard}`][1]}</h3>
                    <div className="answer-container">
                      <button
                        className="incorrect"
                        onClick={() => this.answered("wrong")}
                      >
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                      </button>
                      <button
                        className="correct"
                        onClick={() => this.answered("right")}
                      >
                        <FontAwesomeIcon icon={faCheck} size="2x" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </>
      );
    }

    return (
      <>
        <div className="deck-view-container">
          {cards}

          <div className="button-wrapper">
            <Link className="back-button" to={`/${this.props.user}`}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Link>
            <button
              className="add-new-card-button"
              onClick={() => {
                this.setState({ showNewCard: true });
              }}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
              Edit
            </button>
          </div>
          <AddNewCard
            deleteCard={this.props.deleteCard}
            inProp={this.state.showNewCard}
            hideNewCard={this.hideNewCard}
            editCards={this.props.editCards}
            deck={this.props.decks[this.props.match.params.deckId]}
            deckId={this.props.match.params.deckId}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Deck);
