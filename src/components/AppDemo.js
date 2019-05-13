import React, { Component } from "react";
import "../App.css";
import DecksDemo from "./DecksDemo";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Deck from "./Deck";
// import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
// import AddNewDeck from "./AddNewDeck";

class AppDemo extends Component {
  state = {
    user: "demo",
    wrongUser: false,
    showNewDeck: false,
    decks: [
      {
        cards: [
          [
            "This is the first card in the deck. Click to flip this card!",
            "If you know the answer on the back, click the check mark. Otherwise, click the 'x'"
          ],
          [
            "You can add new cards or edit existing cards by pressing the 'edit' button in the upper right corner.",
            "You can also delete cards in the edit menu by clicking the 'x.'"
          ],
          [
            "After studying all the cards, you can see your results.",
            "This is the last card, answer to see how you did!"
          ]
        ],
        description:
          "This is a deck of flashcards. Click to study these cards.",
        title: "Your First Deck!"
      }
    ]
  };
  //   authHandler = async authData => {
  //     const userCards = await base.fetch(authData.user.uid, { context: this });
  //     if (
  //       userCards.owner !== authData.user.uid ||
  //       authData.user.uid !== this.props.match.params.user
  //     ) {
  //       if (this.state.wrongUser !== true) {
  //         this.setState({
  //           wrongUser: true
  //         });
  //       }
  //     }
  //   };
  componentDidMount() {
    //check for local storage
    if (window.localStorage.getItem("state")) {
      console.log("there is a state");
      window.localStorage.clear();

      let state = JSON.parse(window.localStorage.getItem("state"));
      console.log(state);
      this.setState(state);
    } else {
      console.log("there is no state");
      let state = JSON.stringify(this.state);
      window.localStorage.setItem("state", state);
    }
  }
  componentDidUpdate() {
    let state = JSON.stringify(this.state);
    window.localStorage.setItem("state", state);
  }

  addDeck = (title, description) => {
    let decks = Array.from(this.state.decks);
    decks.push({
      title: title,
      description: description,
      cards: null
    });
    this.setState({ decks, showNewDeck: false });
  };

  deleteDeck = (e, deckId) => {
    e.preventDefault();
    let box = window.confirm("Are you sure you want to delete this deck?");
    if (box === true) {
      let decks = this.state.decks;
      delete decks[deckId];
      this.setState({
        decks
      });
    } else {
      return false;
    }
  };

  toggleNewDeck = () => {
    let showNewDeck = !this.state.showNewDeck;
    this.setState({
      showNewDeck
    });
  };
  editCards = (thisDeck, thisTarget, thisValue, side, newCard) => {
    let decks = this.state.decks;
    if (newCard) {
      if (!decks[thisDeck]["cards"]) {
        decks[thisDeck]["cards"] = [];
      }
      decks[thisDeck]["cards"][thisTarget] = [];
      decks[thisDeck]["cards"][thisTarget].push(thisValue[0], thisValue[1]);
    } else {
      side
        ? (decks[thisDeck]["cards"][thisTarget][side] = thisValue)
        : (decks[thisDeck][thisTarget] = thisValue);
    }
    this.setState({
      decks
    });
  };
  deleteCard = (e, deckNum, cardNum) => {
    e.preventDefault();
    let decks = this.state.decks;
    delete decks[deckNum]["cards"][cardNum];
    this.setState({
      decks
    });
  };
  render() {
    if (this.state.wrongUser === true) {
      return <Redirect to="/" />;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact
            path="/demo"
            render={props => (
              <DecksDemo
                decks={this.state.decks}
                addDeck={this.addDeck}
                showNewDeck={this.state.showNewDeck}
                editCards={this.editCards}
                toggleNewDeck={this.toggleNewDeck}
                user={this.state.user}
                deleteDeck={this.deleteDeck}
              />
            )}
          />
          <Route
            path="/demo/:deckId"
            // render={props => <Deck deck={props.location.state.deck} {...props} />}
            render={props => (
              <Deck
                editCards={this.editCards}
                decks={this.state.decks}
                user={this.state.user}
                deleteCard={this.deleteCard}
                {...props}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppDemo;
