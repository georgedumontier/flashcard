import React from "react";
import { CSSTransition } from "react-transition-group";

const AddNewCard = props => {
  return (
    <CSSTransition in={props.inProp} timeout={300} classNames="add-new-card">
      <div className="add-new-card">
        <div className="and-close-button" onClick={() => props.hideNewDeck()}>
          &times;
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddNewCard;
