import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/LogIn";
import Debits from "./components/Debits";
import Credits from "./components/Credits";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
      },
      debits: [],
      credits: []
    };
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;

        this.setState({
          debits: data
        })
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
      />
    );

    const CreditsComponent = () => (
      <Credits 
        credits={this.state.credits}
        accountBalance={this.state.accountBalance}      
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
