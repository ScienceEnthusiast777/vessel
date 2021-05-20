import React, { Component } from "react";
import { login } from "../services/auth";

export default class LogIn extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    login(username, password).then((response) => {
      if (response.message) {
        this.setState({
          message: response.message,
          username: "",
          password: "",
        });
      } else {
        this.props.setUser(response);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="Landing">
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button type="submit">LOG IN</button>
          {this.state.message && (
            <p>{this.state.message}</p>
          )}
        </form>
      </div>
    );
  }
}
