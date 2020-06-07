import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Home, LogIn, UserProfile, Debits, Credits } from "./components";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
      },
      debits: [],
      credits: [],
      currentCredit: 0,
      currentDebit: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;

        this.setState({
          debits: data,
        });

        let totalDebit = 0;

        for (let debitObect of data) {
          totalDebit += Number(debitObect.amount);
        }

        this.setState({
          currentDebit: totalDebit
        })

        this.setState({
          accountBalance: (this.state.currentCredit - this.state.currentDebit).toFixed(2),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;

        this.setState({
          credits: data,
        });

        let totalCredit = 0;

        for (let creditObject of data) {
          totalCredit += Number(creditObject.amount);
        }

        this.setState({
          currentCredit: totalCredit,
        });

        this.setState({
          accountBalance: (this.state.currentCredit - this.state.currentDebit).toFixed(2),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  addDebits = (newDebit) => {
    let updatedDebitsArray = [newDebit, ...this.state.debits];
    this.setState({
      debits: updatedDebitsArray,
      accountBalance: (Number(this.state.accountBalance) - Number(newDebit.amount)).toFixed(2),
    });
  };

  addCredits = (newCredit) => {
    let updatedCreditsArray = [newCredit, ...this.state.credits];
    this.setState({
      credits: updatedCreditsArray,
      accountBalance: (Number(this.state.accountBalance) + Number(newCredit.amount)).toFixed(2),
    });
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );

    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );

    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );

    const DebitsComponent = () => (
      <Debits
        debits={this.state.debits}
        accountBalance={this.state.accountBalance}
        addDebits={this.addDebits}
      />
    );

    const CreditsComponent = () => (
      <Credits
        credits={this.state.credits}
        accountBalance={this.state.accountBalance}
        addCredits={this.addCredits}
      />
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/UserProfile" component={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/Debits" render={DebitsComponent} />
          <Route exact path="/Credits" render={CreditsComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
