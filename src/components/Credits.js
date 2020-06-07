import React, { Component } from "react";
import Card from "./Card";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditInfo: {
                id: "",
                description: "",
                amount: "",
                date: ""
            },
            redirectToHome: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addCredits(this.state.creditInfo);
        this.setState({ redirectToHome: true });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const newInput = event.target.value;
        const newCreditInfo = {...this.state.creditInfo};
        
        newCreditInfo[name] = newInput; 

        const date = new Date().toLocaleDateString("en-US");
        newCreditInfo.date = date;
        const id = Math.floor(Math.random() * 9999999999) + 1;
        newCreditInfo.id = id;
        this.setState({
            creditInfo: newCreditInfo
        });
    }

    render() {
        if (this.state.redirectToHome) {
          return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h1>Credits</h1>

                <Link to="/" className="btn btn-secondary m-1">
                    Home
                </Link>

                <div className="m-5">
                    <AccountBalance accountBalance={this.props.accountBalance} />
                </div>

                <div className="m-5">
                    <h2>New Credit</h2>

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
