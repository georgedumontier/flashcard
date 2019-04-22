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
    currentCard: 1
  };
  flipCard = () => {
    let cardIsFlipped = !this.state.cardIsFlipped;
    console.log(cardIsFlipped);
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
    if (this.state.currentCard === Object.keys(deck.cards).length + 1) {
      return (
        <div className="results">
          <h1>These are your results: You fail!</h1>
        </div>
      );
    }

    return (
      <div className="deck-view-container">
        <h3>{deck.title}</h3>
        <TransitionGroup component={null}>
          <CSSTransition
            timeout={300}
            classNames="fade"
            key={this.state.currentCard}
          >
            <div className="deck-view">
              {/* <h3>{this.props.deck.title}</h3> */}

              <div
                className={`card ${
                  this.state.cardIsFlipped ? "cardIsFlipped" : ""
                }`}
              >
                <div className="front-side" onClick={() => this.flipCard()}>
                  <h3>{deck.cards[`card${this.state.currentCard}`][0]}</h3>
                </div>
                <div className="back-side">
                  <h3>{deck.cards[`card${this.state.currentCard}`][1]}</h3>
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
  }
}

export default Deck;
