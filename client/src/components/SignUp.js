import React, { Component } from 'react';
import {signup} from '../services/auth';

export default class SignUp extends Component {

  state = {
    username : '',
    password : '',
    message: ''
  }

  changeHandler = (e) =>{
    const {name, value} = e.target;
    this.setState({
      [name]:value
    });
  }

  submitHandler = (e) =>{
    e.preventDefault();
    const {username, password} = this.state;
    signup(username,password)
    .then(response=>{
        if(response.message){
          this.setState({
            message: response.message,
            username: '',
            password: ''
          })
        }else {
          this.props.setUser(response);
          this.props.history.push('/furnace');
        }
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username: </label>
          <input 
          id="username"
          type="text"
          name= "username"
          value={this.state.username}
          onChange={this.changeHandler} 
          />
          <label htmlFor="password">Password: </label>
          <input 
          id="password"
          type="password"
          name= "password"
          value={this.state.password}
          onChange={this.changeHandler}
           />
           <button type="submit">SIGN UP</button>
           {this.state.message && (<p>{this.state.message}</p>)}
        </form>
      </div>
    )
  }
}
