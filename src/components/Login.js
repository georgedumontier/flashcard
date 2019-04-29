import React from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Login extends React.Component {
  state = {
    uid: null
  };
  authHandler = async authData => {
    const userCards = await base.fetch(authData.user.uid, { context: this });
    if (!userCards.owner) {
      await base.post(`${authData.user.uid}/owner`, {
        data: authData.user.uid
      });
    }
    this.setState({
      uid: authData.user.uid
    });
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  render() {
    if (this.state.uid) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.uid}`,
            uid: this.state.uid
          }}
        />
      );
    }
    return (
      <>
        <h2>Flashcards!</h2>
        <p>Please login with one of the following methods:</p>
        <button className="github" onClick={() => this.authenticate("Github")}>
          Login with Github
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate("Twitter")}
        >
          Log in with Twitter
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate("Facebook")}
        >
          Log in with Facebook
        </button>
        {/* <Link to="/George/">George's flashcards</Link> */}
      </>
    );
  }
}

export default Login;
