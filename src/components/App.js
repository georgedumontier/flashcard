import React, { Component } from 'react';
import '../App.css';
import Decks from "./Decks";
import AddNewDeck from "./AddNewDeck";

class App extends Component {
  state = {
    showNewDeck:false,
    decks:{
      "1":{
        title:"Deck 1",
        description:"This is your first deck of flashcards!",
        cards:{
          card1:["front side","back side"],
          card2:["front side","back side"]
        }
      },
      "2":{
        title:"Deck 2",
        description:"This is your second deck of flashcards!",
        cards:{
          card1:["front side","back side"],
          card2:["front side","back side"]
        }
      },
    }
  }

  showNewDeck = ()=> {
    this.setState({
      showNewDeck:true
    });  
  }
  hideNewDeck = ()=> {
    this.setState({
      showNewDeck:false
    });  
  }
  render() {
    console.log(this.state.decks);
    return (
      <div className="App">
        <Decks decks={this.state.decks}></Decks>
        <div className="button-wrapper"><button className="create-deck" onClick={()=>{this.showNewDeck()}}>+ New Deck</button></div>
        <AddNewDeck hideNewDeck={this.hideNewDeck} inProp={this.state.showNewDeck}></AddNewDeck>
      </div>
    );
  }
}

export default App;
