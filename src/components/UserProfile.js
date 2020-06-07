import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserProfile extends Component {
    render() {
        return (
          <div>
            <h1>User Profile</h1>

            <div>Username: {this.props.userName}</div>
            <div>Member since: {this.props.memberSince}</div>

            <div>
              <Link to="/">Go Back Home</Link>
            </div>
            <div>
              <Link to="/login">Log In</Link>
            </div>
          </div>
        );
    }
}

export default UserProfile;