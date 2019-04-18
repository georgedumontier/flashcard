import React, { Component } from "react";
import "../App.css";
import Decks from "./Decks";
// import AddNewDeck from "./AddNewDeck";

class App extends Component {
  state = {
    showNewDeck: false,
    decks: [
      {
        title: "Deck 1",
        description: "This is your first deck of flashcards!",
        cards: {
          card1: ["front side", "back side"],
          card2: ["front side", "back side"]
        }
      },
      {
        title: "Deck 2",
        description: "This is your second deck of flashcards!",
        cards: {
          card1: ["front side of card 1", "back side of card 1"],
          card2: ["front side of card 2", "back side of card 2"],
          card3: ["front side of card 3", "back side of card 3"],
          card4: ["front side of card 4", "back side of card 4"],
          card5: ["front side of card 5", "back side of card 5"]
        }
      }
    ]
  };

  addDeck = (title, description) => {
    let decks = this.state.decks;
    decks.push({
      title: title,
      description: description,
      cards: {}
    });
    this.setState({ decks, showNewDeck: false });
  };

  showNewDeck = () => {
    this.setState({
      showNewDeck: true
    });
  };
  hideNewDeck = () => {
    this.setState({
      showNewDeck: false
    });
  };
  render() {
    return (
      <div className="App">
        <Decks
          decks={this.state.decks}
          addDeck={this.addDeck}
          showNewDeck={this.state.showNewDeck}
        />
        <div className="button-wrapper">
          <button
            className="create-deck"
            onClick={() => {
              this.showNewDeck();
            }}
          >
            + New Deck
          </button>
        </div>
      </div>
    );
  }
}

export default App;
