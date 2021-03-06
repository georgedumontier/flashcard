import React from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";

class Login extends React.Component {
  _isMounted = null;
  state = {
    uid: null,
    loggedIn: false,
    cardIsFlipped: false
  };

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.uid !== this.state.uid && this._isMounted) {
          this.setState({ uid: user.uid });
        }
      } else {
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  flipCard = () => {
    let cardIsFlipped = !this.state.cardIsFlipped;
    this.setState({
      cardIsFlipped
    });
  };
  authHandler = async authData => {
    const userCards = await base.fetch(authData.user.uid, { context: this });
    if (!userCards.owner) {
      await base.post(`${authData.user.uid}/owner`, {
        data: authData.user.uid
      });
    }
    if (this.state.uid == null) {
      this.setState({
        uid: authData.user.uid
      });
    }
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(err => {
        alert(err.message);
      });
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
      <div className="login">
        <h2>
          Fla
          <span role="img" aria-label="lightning bolt acting as letter 'S'">
            ⚡
          </span>
          hcard
        </h2>
        <div className="deck-view">
          <div
            className={`card ${
              this.state.cardIsFlipped ? "cardIsFlipped" : ""
            }`}
          >
            <div className="front-side" onClick={() => this.flipCard()}>
              <p>Login with one of the methods below.</p>
            </div>
            <div className="back-side" onClick={() => this.flipCard()}>
              <p>Nice flip!</p>
            </div>
          </div>
          <button
            className="github"
            onClick={() => this.authenticate("Github")}
          >
            <FontAwesomeIcon icon={faGithub} />
            <span> Log in with Github</span>
          </button>
          {/* <button
            className="twitter"
            onClick={() => this.authenticate("Twitter")}
          >
            <FontAwesomeIcon icon={faTwitter} />
            <span> Log in with Twitter </span>
          </button> */}
          <button
            className="facebook"
            onClick={() => this.authenticate("Facebook")}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span> Log in with Facebook</span>
          </button>
          <Link to={"/demo"}>
            <p className="login-demo">Or click here to see a demo</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
