import React, { Component } from "react";
import Card from "./Card";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Debits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debitInfo: {
                id: "",
                description: "",
                amount: "",
                date: ""
            },
            redirectToHome: false
        }
    }

    // Once the user submits a new debit, call the addDebits function in App with our new state and redirect (both fields are 'required')
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addDebits(this.state.debitInfo);
        this.setState({ redirectToHome: true });
    }

    // When the form input changes, update our state with the given description or amount and calculate an ID and current time
    handleChange = (event) => {
        const name = event.target.name;
        const newInput = event.target.value;

        // Copy the current state object
        const newDebitInfo = {...this.state.debitInfo};

        // This will update either the description or amount based on what input field was changed
        newDebitInfo[name] = newInput; 

        // Get current date in US format
        const date = new Date().toLocaleDateString("en-US");
        newDebitInfo.date = date;

        // Generate a pseudorandom ID 
        const id = Math.floor(Math.random() * 9999999999) + 1;
        newDebitInfo.id = id;

        this.setState({
            debitInfo: newDebitInfo
        });
    }

    render() {
        // If our form is completed upon submit, redirect to the home route
        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }

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
                  name="description"
                  required
                ></input>
                <input
                  type="number"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                  className="m-2"
                  name="amount"
                  step="0.01"
                  required
                ></input>
                <input
                  type="submit"
                  className="btn btn-primary m-2"
                  value="Add Debits"
                >
                </input>
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