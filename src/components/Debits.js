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

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        // this.setState({
        //     description: event.target.value,
        // })
        console.log("change");
    }

    render() {


        return (
          <div className="container">
            <h1>Debits</h1>

            <Link to="/" className="btn btn-secondary m-1">
              Home
            </Link>

            <div className="m-5">
              <AccountBalance accountBalance={this.props.accountBalance} />
            </div>

            <div className="m-5">
              <h2>New Debit</h2>

              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  className="my-2 mr-2"
                ></input>
                <input
                  type="number"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                  className="m-2"
                ></input>
                <button
                  type="button"
                  className="btn btn-primary m-2"
                >
                  Add Debit
                </button>
              </form>
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