import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
// import Deck from "./Deck";

class Decks extends React.Component {
  state = {
    Title: "Title",
    Description: "Description"
  };
  handleForm = e => {
    e.preventDefault();
    this.props.addDeck(this.state.Title, this.state.Description);
  };
  handleChange = e => {
    let target = e.target.name;
    let value = e.target.value;
    this.setState({ [target]: value });
  };

  render() {
    const decks = this.props.decks;

    return (
      <div className="decks-wrap">
        <CSSTransition
          in={this.props.showNewDeck}
          timeout={300}
          classNames="new-deck"
        >
          <form className="deck" onSubmit={this.handleForm}>
            <input
              type="text"
              name="Title"
              placeholder={this.state.Title}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="Description"
              placeholder={this.state.Description}
              onChange={this.handleChange}
            />
            <button type="submit" value="submit">
              Create deck
            </button>
          </form>
        </CSSTransition>
        {Array.from(decks).map(function(deck, i) {
          return (
            <Link
              to={{
                pathname: `/${this.props.user}/${i}`,
                state: {
                  deck: deck
                }
              }}
              key={i}
            >
              <div key={i} className="deck">
                <h3>{deck.title}</h3>
                <p>{deck.description}</p>
              </div>
            </Link>
          );
        }, this)}
        <div className="button-wrapper">
          <button
            className="create-deck"
            onClick={() => {
              this.props.toggleNewDeck();
            }}
          >
            + New Deck
          </button>
        </div>
      </div>
    );
  }
}

export default Decks;
