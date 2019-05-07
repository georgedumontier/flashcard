import React, { Component } from "react";
import "../App.css";
import Decks from "./Decks";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Deck from "./Deck";
import base from "../base";
import firebase from "firebase";
// import AddNewDeck from "./AddNewDeck";

class App extends Component {
  state = {
    user: "",
    wrongUser: false,
    testProp: false,
    showNewDeck: false,
    decks: []
  };
  authHandler = async authData => {
    const userCards = await base.fetch(authData.user.uid, { context: this });
    if (
      userCards.owner !== authData.user.uid ||
      authData.user.uid !== this.props.match.params.user
    ) {
      if (this.state.wrongUser !== true) {
        this.setState({
          wrongUser: true
        });
      }
    }
  };
  componentDidMount() {
    //   //check if logged in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
      if (!user) {
        if (this.state.wrongUser !== true) {
          this.setState({ wrongUser: true });
        }
      }
    });
    let user = this.props.match.params.user;
    this.ref = base.syncState(`${user}/decks`, {
      context: this,
      state: "decks"
    });
    this.setState({
      user
    });
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
    console.log(deckNum);
    console.log(cardNum);
    let decks = this.state.decks;
    delete decks[deckNum]["cards"][cardNum];
    console.log(decks);
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
          <h1>Flashcards are awesome!</h1>
          <Route
            exact
            path="/:user"
            render={props => (
              <Decks
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
            path="/:user/:deckId"
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

export default App;
