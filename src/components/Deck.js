import React from "react";
import { CSSTransition } from "react-transition-group";

class Deck extends React.Component {
  state = {
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
  render() {
    const cards = this.props.deck.cards;
    console.log(cards[`card${this.state.currentCard}`]);

    return (
      <CSSTransition timeout={300} classNames="fade">
        <div className="deck-view">
          <h3>{this.props.deck.title}</h3>
          <div
            className={`card ${
              this.state.cardIsFlipped ? "cardIsFlipped" : ""
            }`}
            onClick={() => this.flipCard()}
          >
            <div className="front-side">
              {cards[`card${this.state.currentCard}`][0]}
            </div>
            <div className="back-side">
              {cards[`card${this.state.currentCard}`][1]}
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Deck;

// {cards.map((card, i) => {
//     return (
//       <div
//         className={`card ${
//           this.state.cardIsFlipped ? "cardIsFlipped" : ""
//         }`}
//         key={i}
//         onClick={() => this.flipCard()}
//       >
//         <div className="front-side">
//           {this.props.deck.cards[card][0]}
//         </div>
//         <div className="back-side">
//           {this.props.deck.cards[card][1]}
//         </div>
//       </div>
//     );
//   })}
