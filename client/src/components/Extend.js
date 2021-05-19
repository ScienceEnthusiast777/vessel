import axios from "axios";
// import { response } from "express";
import React, { Component } from "react";

export default class RulesEdit extends Component {
  state = {
    _id: null,
    name: "",
    explanation: "",
    extension: "",
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
    const { extension } = this.state;
    axios
      .put(`/api/rules/extend/${this.state._id}`, {
        extension,
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
          <h1>{this.state.name}</h1>
          <h3>{this.state.explanation}</h3>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="name">YOUR EXTENSION TO "{this.state.name}" </label>
            <input
              type="text"
              name="extension"
              id="name"
              value={this.state.extension}
              onChange={this.changeHandler}
            />
            <button type="submit">SUBMIT EXTENSION</button>
            {this.state.message && <p>{this.state.message}</p>}
          </form>
        </>
      );
    }
    return <div>{isLoaded}</div>;
  }
}
