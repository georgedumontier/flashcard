import React from "react";
import {Link} from "react-router-dom";
// import Deck from "./Deck";

class Decks extends React.Component{
    render(){
        const decks = this.props.decks;
        console.log(decks);
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
                    let deck=decks[deckId];
                    return  (
                        <Link to="./decks" key={deckId}>
                            <div key={deckId} className="deck">
                                <h3>{deck.title}</h3>
                                <p>{deck.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

export default Decks;