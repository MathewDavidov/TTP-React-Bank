import React, { Component } from "react";
import Card from "./Card";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Debits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            description: "",
            amount: "",
            date: ""
        }
    }

    render() {


        return (
          <div className="container">
            <h1>Debits</h1>

            <Link to="/" className="btn btn-secondary m-1">
              Home
            </Link>

            <div>
              <AccountBalance accountBalance={this.props.accountBalance} />
            </div>

            <div>
              {this.props.debits.map((debit) => (
                <Card
                  key={debit.id}
                  description={debit.description}
                  amount={debit.amount}
                  date={debit.date}
                />
              ))}
            </div>
          </div>
        );
    }
}

export default Debits;