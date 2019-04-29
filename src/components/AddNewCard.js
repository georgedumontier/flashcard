import React from "react";
import { CSSTransition } from "react-transition-group";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class AddNewCard extends React.Component {
  state = {
    0: "",
    1: ""
  };
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
  handleNewCardChange = e => {
    let side = e.currentTarget.dataset.side;
    let value = e.currentTarget.value;
    this.setState({
      [side]: value
    });
  };
  createCard = e => {
    let thisDeck = this.props.deckId;
    let thisTarget = e.currentTarget.name;
    let thisValue = e.currentTarget.value;
    let side = e.currentTarget.dataset.side;
    this.props.editCards(thisDeck, thisTarget, thisValue, side);
  };
  submitNewCard = e => {
    e.preventDefault();
    let thisTarget;
    if (!this.props.deck.cards) {
      thisTarget = 0;
    } else {
      thisTarget = this.props.deck.cards.length;
    }
    let thisDeck = this.props.deckId;
    this.props.editCards(thisDeck, thisTarget, [" ", " "], "0", true);
  };
  render() {
    let cardList;
    if (!this.props.deck.cards) {
      cardList = <div>There are no cards in this deck</div>;
    } else
      cardList = this.props.deck.cards.map((card, i) => {
        return (
          <div className="and-card" key={i}>
            <h4>Card {i + 1} </h4>
            <label>Front:</label>
            <input
              type="text"
              name={i}
              value={this.props.deck.cards[i][0]}
              onChange={this.handleCardChange}
              data-side="0"
            />
            <label> Back: </label>
            <input
              type="text"
              name={i}
              value={this.props.deck.cards[i][1]}
              onChange={this.handleCardChange}
              data-side="1"
            />
          </div>
        );
      });

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
              {cardList}
            </form>
            <button className="new-card-button" onClick={this.submitNewCard}>
              + Card
            </button>

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
