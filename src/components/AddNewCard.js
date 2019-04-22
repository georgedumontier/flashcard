import React from "react";
import { CSSTransition } from "react-transition-group";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class AddNewCard extends React.Component {
  handleChange = e => {
    console.log(e.currentTarget.value);
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
              <input
                className="title-form"
                name="title"
                type="text"
                value={this.props.deck.title}
                onChange={this.handleChange}
              />
              <textarea
                name="description"
                type="text"
                value={this.props.deck.description}
                onChange={this.handleChange}
              />
              {Object.keys(this.props.deck.cards).map(card => {
                return <p>{this.props.deck.cards[card]}</p>;
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
