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
          startIn = this.state.page * 2 + 1;
        }
        let sorted = response.data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        let selection = [];
        for (let i = startIn; i < startIn + 5; i++) {
          if (sorted.length < i) {
            return;
          }
          selection.push(sorted[i]);
        }
        let noOfPages = Math.round(response.data.length / 5);
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
          {this.state.pages}
        </>
      );
    }
    console.log(this.state.rules);
    return (
      <div>
        <button onClick={this.clickDownHandler}>PREVIOUS PAGE</button>
        <button onClick={this.clickUpHandler}>NEXT PAGE</button>
        {isLoaded}
      </div>
    );
  }
}
