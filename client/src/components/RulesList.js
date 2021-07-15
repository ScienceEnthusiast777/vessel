import axios from "axios";
import React, { Component } from "react";
import RulesPage from "./RulesPage";

export default class RulesList extends Component {
  state = {
    rules: [],
    page: 0,
    pages: 0,
    loaded: false,
  };

  getRules = () => {
    axios
      .get("/api/rules/")
      .then((response) => {
        let startIn = 0;
        if (this.state.page > 0) {
          startIn = this.state.page * 5;
        }
        let sorted = response.data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        let selection = [];
        for (let i = startIn; i < startIn + 4; i++) {
          if (sorted.length < i+1) {
            break;
          }
          selection.push(sorted[i]);
        }
        let noOfPages = Math.ceil(response.data.length / 5);
        this.setState({
          rules: selection,
          pages: noOfPages,
          loaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  clickUpHandler = () => {
    if (this.state.pages - 1 < this.state.page + 1) {
      return;
    }
    this.setState({
      page: this.state.page + 1,
    });
    this.getRules();
  };
  clickDownHandler = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({
      page: this.state.page - 1,
    });
    this.getRules();
  };
  componentDidMount() {
    this.getRules();
  }
  render() {
    let isLoaded = <></>;
    if (this.state.loaded === true) {
      isLoaded = (
        <>
        <RulesPage page={this.state.page} rules={this.state.rules} />
          {`page: ${this.state.page + 1}`}
        </>
      );
    }
    return (
      <div className="flex flex-col items-center mt-20 h-screen">
        <div className="bg-white flex flex-col items-center border border-black border-5 m-5 mt-20 mb-20 p-6">
            <button className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44  font-bold" onClick={this.clickDownHandler}>PREVIOUS PAGE</button>
            <button className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44  font-bold" onClick={this.clickUpHandler}>NEXT PAGE</button>
          {isLoaded}
        </div>
      </div>
    );
  }
}
