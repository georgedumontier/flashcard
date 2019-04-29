import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSkull,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import AddNewCard from "./AddNewCard";

class Deck extends React.Component {
  state = {
    showNewCard: false,
    cardIsFlipped: false,
    currentCard: 0
  };
  flipCard = () => {
    let cardIsFlipped = !this.state.cardIsFlipped;
    this.setState({
      cardIsFlipped
    });
  };
  answered = answer => {
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
  render() {
    let deckId = this.props.match.params.deckId;
    let deck = this.props.decks[deckId];
    if (!deck) {
      return <p>loading...</p>;
    }
    let cards;
    if (!deck.cards) {
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
            inProp={this.state.showNewCard}
            hideNewCard={this.hideNewCard}
            editCards={this.props.editCards}
            deck={this.props.decks[this.props.match.params.deckId]}
            deckId={this.props.match.params.deckId}
          />
        </div>
      );
    } else if (deck.cards && this.state.currentCard === deck.cards.length) {
      return (
        <div className="results">
          <h1>These are your results: You fail!</h1>
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
                    <button
                      className="correct"
                      onClick={() => this.answered("right")}
                    >
                      <FontAwesomeIcon icon={faSkull} size="3x" />
                    </button>
                    <button onClick={() => this.answered("wrong")}>
                      <FontAwesomeIcon icon={faCheck} size="3x" />
                    </button>
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

export default Deck;
