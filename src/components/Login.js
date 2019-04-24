import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <>
        <h2>Please login using one of these methods:</h2>
        <Link to="/George/">George's flashcards</Link>
      </>
    );
  }
}

export default Login;
