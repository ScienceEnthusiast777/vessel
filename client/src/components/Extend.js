import axios from "axios";
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
    this.getRule();
  }

  render() {
    var isLoaded = <></>;
    if (this.state._id) {
      isLoaded = (
        <>
          <div className="WhiteShadow FormFormat">
            <p>{this.state.name}</p>
            <p>{this.state.explanation}</p>
          </div>
          <form
            className="BlackShadow FormFormat"
            onSubmit={this.submitHandler}
          >
            <label htmlFor="name">YOUR EXTENSION TO "{this.state.name}" </label>
            <textarea
              colums="100"
              rows="25"
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
    return (
      <div className="RulesPages">
        <div className="RulesPageContainer">{isLoaded}</div>
      </div>
    );
  }
}
