import React, { Component } from "react";
import { signup } from "../services/auth";

export default class SignUp extends Component {
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
    signup(username, password).then((response) => {
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
      <div className="flex flex-row justify-center mt-20 h-screen">
        <div className="m-5 mt-20 mb-20">
          <form
            className="flex flex-col w-52 font-bold"
            onSubmit={this.submitHandler}
          >
            <div>
              <label htmlFor="username">Username: </label>
              <input
                className="border border-black m-2"
                id="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.changeHandler}
              />
              <label htmlFor="password">Password: </label>
              <input
                className="border border-black m-2"
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.changeHandler}
              />
              <button
                className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44"
                type="submit"
              >
                SIGN UP
              </button>
            </div>
          </form>
          {this.state.message && (
            <p>{this.state.message}</p>
          )}
        </div>
      </div>
    );
  }
}
