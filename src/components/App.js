import React, { Component } from 'react';
import '../App.css';
import Decks from "./Decks";

class App extends Component {
  state = {
    decks:{
      "091234":{
        title:"A Title",
        cards:{
          card1:["front side","back side"],
          card2:["front side","back side"]
        }
      },
      "13516":{
        title:"A Title",
        cards:{
          card1:["front side","back side"],
          card2:["front side","back side"]
        }
      },
    }
  }
  render() {
    return (
      <div className="App">
        <Decks decks={this.state.decks}></Decks>
      </div>
    );
  }
}

export default App;
