import React from "react";
import { CSSTransition } from "react-transition-group";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class AddNewCard extends React.Component {
  handleCardChange = e => {
    let thisDeck = this.props.deckId;
    let thisTarget = e.currentTarget.name;
    let thisValue = e.currentTarget.value;
    let side = e.currentTarget.dataset.side;
    this.props.editCards(thisDeck, thisTarget, thisValue, side);
  };
  handleChange = e => {
    let thisDeck = this.props.deckId;
    let thisTarget = e.currentTarget.name;
    let thisValue = e.currentTarget.value;

    this.props.editCards(thisDeck, thisTarget, thisValue);
  };
  render() {
    return (
      <CSSTransition
        in={this.props.inProp}
        timeout={300}
        classNames="add-new-card-container"
      >
        <div className="add-new-card-container">
          <div
            className="and-spacer"
            onClick={() => this.props.hideNewCard()}
          />
          <div className="add-new-card">
            <form>
              {/* <FontAwesomeIcon className="pencil-icon" icon={faPencilAlt} /> */}
              <label>Title:</label>
              <input
                className="title-form"
                name="title"
                type="text"
                value={this.props.deck.title}
                onChange={this.handleChange}
              />
              <label>Description:</label>
              <textarea
                name="description"
                type="text"
                value={this.props.deck.description}
                onChange={this.handleChange}
              />
              {Object.keys(this.props.deck.cards).map((card, i) => {
                // let frontName = { card };
                // let backName = { card };
                return (
                  <div className="and-card" key={card}>
                    <h4>Card {i + 1} </h4>
                    <label>Front:</label>
                    <input
                      type="text"
                      name={card}
                      value={this.props.deck.cards[card][0]}
                      onChange={this.handleCardChange}
                      data-side="0"
                    />
                    <label> Back: </label>
                    <input
                      type="text"
                      name={card}
                      value={this.props.deck.cards[card][1]}
                      onChange={this.handleCardChange}
                      data-side="1"
                    />
                  </div>
                );
              })}
            </form>

            <div
              className="and-close-button"
              onClick={() => this.props.hideNewCard()}
            >
              &times;
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
export default AddNewCard;
