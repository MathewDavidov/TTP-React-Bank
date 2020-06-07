import React, { Component } from "react";
import Card from "./Card";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            description: "",
            amount: "",
            date: "",
        };
    }

    render() {
        return (
            <div className="container">
                <h1>Credits</h1>

                <Link to="/" className="btn btn-secondary m-1">
                    Home
                </Link>

                <div>
                    <AccountBalance accountBalance={this.props.accountBalance} />
                </div>

                <div>
                    {this.props.credits.map((credit) => (
                    <Card
                        key={credit.id}
                        description={credit.description}
                        amount={credit.amount}
                        date={credit.date}
                    />
                    ))}
                </div>
            </div>
        );
    }
}

export default Credits;
