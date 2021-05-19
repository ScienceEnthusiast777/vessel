import axios from "axios";
// import { response } from "express";
import React, { Component } from "react";

export default class RulesEdit extends Component {
  state = {
    _id: null,
    name: "",
    explanation: "",
    message: "",
  };

  getRule = () => {
    axios
      .get(`/api/rules/rule/${this.props.match.params.id}`)
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        this.setState({
          _id: data._id,
          name: data.name,
          explanation: data.explanation,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { name, explanation } = this.state;
    axios
      .put(`/api/rules/rule/${this.state._id}`, {
        name,
        explanation,
      })
      .then((response) => {
        if (response.message) {
          this.setState({
            message: response.message,
          });
        } else {
          this.props.history.push("/ruleslist");
        }
      });
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    console.log("mounted");
    this.getRule();
  }

  render() {
    var isLoaded = <></>;
    if (this.state._id) {
      isLoaded = (
        <>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="name">Name the ruleset: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.changeHandler}
            />
            <label htmlFor="name">Explanation: </label>
            <input
              type="text"
              name="explanation"
              id="explanation"
              value={this.state.explanation}
              onChange={this.changeHandler}
            />
            <button type="submit">SUBMIT CHANGES</button>
            {this.state.message && <p>{this.state.message}</p>}
          </form>
        </>
      );
    }
    return <div>{isLoaded}</div>;
  }
}
