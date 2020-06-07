import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userName: "",
        password: "",
      },
      redirect: false,
    };
  }

  handleChange = (e) => {
    const updatedUser = { ...this.state.user };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedUser[inputField] = inputValue;

    this.setState({ user: updatedUser });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.mockLogIn(this.state.user);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/userProfile" />;
    }

    return (
      <div className="m-5">
        <div>
          <h1>Login</h1>
        </div>

        <div className="mt-2">
          <Link to="/" className="btn btn-secondary m-1">
            Home
          </Link>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              name="userName"
              onChange={this.handleChange}
              value={this.state.user.userName}
              class="form-control"
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password"
              class="form-control" />
          </div>
          <button className="btn btn-primary">Log In</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
