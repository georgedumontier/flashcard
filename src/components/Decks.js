import React from "react";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
// import Deck from "./Deck";

class Decks extends React.Component{
    state={
        Title:"Title",
        Description:"Description"
    }
    handleForm = (e)=>{
        e.preventDefault();
        this.props.addDeck(this.state.Title, this.state.Description);   
    }
    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({[target]:value})
    }
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
                <CSSTransition in={this.props.showNewDeck} timeout={300} classNames="new-deck">
                <form className="deck" onSubmit={this.handleForm}>
                         <input type="text" name="Title" placeholder={this.state.Title} onChange={this.handleChange}/>
                         <input type="text" name="Description" placeholder={this.state.Description} onChange={this.handleChange} />
                        <button type="submit" value="submit">Create deck</button>
                    </form>   
                </CSSTransition>        
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