import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Furnace from "./components/Furnace";
import Offerings from "./components/Offerings";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import RulesCreate from "./components/RulesCreate"
import RulesList from "./components/RulesList"
import Restricted from "./components/Restricted";
import Rule from "./components/Rule"
import RulesEdit from "./components/RulesEdit"
import Extend from "./components/Extend"
import Landing from "./components/Landing"

class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Restricted
            path="/offerings"
            user={this.state.user}
            component={Offerings}
          />
          <Restricted
            path="/furnace"
            user={this.state.user}
            component={Furnace}
          />
           <Restricted
            path="/ruleslist"
            user={this.state.user}
            component={RulesList}
          />
          <Restricted
            path="/rulescreate"
            user={this.state.user}
            component={RulesCreate}
          />
          <Restricted
            path="/rule/:id"
            user={this.state.user}
            component={Rule}
          />
          <Restricted
            path="/edit/:id"
            user={this.state.user}
            component={RulesEdit}
          />
          <Restricted
            path="/extend/:id"
            user={this.state.user}
            component={Extend}
          />
          <Route
            exact
            path="/"
            render={(props) => <Landing setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <SignUp setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <LogIn setUser={this.setUser} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
