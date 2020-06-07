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
              <Link to="/" className="btn btn-secondary m-1">
                Home
              </Link>
            </div>
          </div>
        );
    }
}

export default UserProfile;