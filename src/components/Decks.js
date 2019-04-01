import React from "react";
import Deck from "./Deck";

class Decks extends React.Component{
    render(){
        const decks = this.props.decks;
        const deckIds = Object.keys(decks);
        
        if(deckIds.length<1){return (
            <div className="no-decks-found">
                <h2>No decks found.</h2>
                <p>It doesn't look like you've made any decks. Try creating your first deck with the button below.</p>
            </div>
        )}
        return (
            <div className="decks-wrap">          
                {deckIds.map(function(deckId){
                    return(<Deck key={deckId} cards={decks[deckId]}></Deck>)
                })}
            </div>
        )
    }
}

export default Decks;