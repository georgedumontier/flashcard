import React from "react";
import {CSSTransition} from "react-transition-group";

const AddNewDeck = (props)=>{
    return (
        <CSSTransition in={props.inProp} timeout={300} classNames="add-new-deck">
                <div className="add-new-deck">
                    <form></form>
                    <div className="and-close-button" onClick={()=>props.hideNewDeck()}>&times;</div>
                </div>
        </CSSTransition>
    )
}

export default AddNewDeck;