// import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Furnace from "./components/Furnace";
import Offerings from "./components/Offerings";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";


class App extends React.Component{

  state = {
    user: this.props.user
  }

  setUser = user =>{
    this.setState({
      user : user
    })
  }

  render(){
    console.log(this.state.user)
    return (
      <div className="App">
        <NavBar user={this.state.user} setUser={this.setUser
        }/>
        <Switch>
          <Route exact path="/offerings" component={Offerings} />
          <Route exact path="/furnace" component={Furnace} />
          <Route exact path="/signup" 
          render={props=> <SignUp setUser={this.setUser}{...props}/>} />
          <Route exact path="/login" 
          render={props=> <LogIn setUser={this.setUser}{...props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
