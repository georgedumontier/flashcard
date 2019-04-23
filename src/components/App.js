import React, { Component } from "react";
import "../App.css";
import Decks from "./Decks";
import { BrowserRouter, Route } from "react-router-dom";
import Deck from "./Deck";
// import AddNewDeck from "./AddNewDeck";

class App extends Component {
  state = {
    testProp: false,
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

  toggleNewDeck = () => {
    let showNewDeck = !this.state.showNewDeck;
    this.setState({
      showNewDeck
    });
  };
  editCards = (thisDeck, thisTarget, thisValue, side) => {
    let decks = this.state.decks;

    console.log("thisDeck:" + thisDeck);
    console.log("thisTarget:" + thisTarget);
    console.log("thisValue:" + thisValue);
    side
      ? (decks[thisDeck]["cards"][thisTarget][side] = thisValue)
      : (decks[thisDeck][thisTarget] = thisValue);
    // decks[thisDeck]["cards"][thisTarget] = thisValue;
    this.setState({
      decks
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Flashcards are awesome!</h1>
          <Route
            exact
            path="/app"
            render={props => (
              <Decks
                decks={this.state.decks}
                addDeck={this.addDeck}
                showNewDeck={this.state.showNewDeck}
                editCards={this.editCards}
                toggleNewDeck={this.toggleNewDeck}
              />
            )}
          />
          <Route
            path="/app/:deckId"
            // render={props => <Deck deck={props.location.state.deck} {...props} />}
            render={props => (
              <Deck
                editCards={this.editCards}
                decks={this.state.decks}
                {...props}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
