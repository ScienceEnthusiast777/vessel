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
          <div className="flex flex-col items-center mt-20 h-screen">
            <div className="w-1/2 bg-white border border-black flex flex-col items-center m-5 mt-20 mb-20 p-2">
              <div className="flex flex-col items-center border border-black border-5 p-3">
                <p className="font-bold">{this.state.name}</p>
                <p>{this.state.explanation}</p>
              </div>
              <form
                className="w-full flex flex-col items-center font-bold"
                onSubmit={this.submitHandler}
              >
                <label htmlFor="name">
                  YOUR EXTENSION TO "{this.state.name}"{" "}
                </label>
                <textarea
                  className="w-full border border-black m-2"
                  colums="100"
                  rows="25"
                  type="text"
                  name="extension"
                  id="name"
                  value={this.state.extension}
                  onChange={this.changeHandler}
                />
                <button
                  className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44"
                  type="submit"
                >
                  SUBMIT EXTENSION
                </button>
                {this.state.message && <p>{this.state.message}</p>}
              </form>
            </div>
          </div>
        </>
      );
    }
    return (
        <div>{isLoaded}</div>
    );
  }
}
