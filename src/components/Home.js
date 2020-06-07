import React, { Component } from "react";
import AccountBalance from "./AccountBalance"; 
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
          <div className="container">
            <div>
                <img
                src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png"
                alt="bank"
                />
                <h1>Bank of React</h1>
            </div>

            <div>
                <Link to="/login" className="btn btn-secondary m-1">
                    Log In
                </Link>

                <Link to="/UserProfile" className="btn btn-secondary m-1">
                    User Profile
                </Link>

                <Link to="/Debits" className="btn btn-secondary m-1">
                    Debits
                </Link>

                <Link to="/Credits" className="btn btn-secondary m-1">
                    Credits
                </Link>
            </div>

            <AccountBalance accountBalance={this.props.accountBalance} />
          </div>
        );
    }
}

export default Home;