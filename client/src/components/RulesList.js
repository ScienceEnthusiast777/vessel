import axios from "axios";
import React, { Component } from "react";
import RulesPage from "./RulesPage";

export default class RulesList extends Component {
  state = {
    rules: [],
    page: 1,
    pages: 0,
    loaded: false
  };

  getRules = () => {
    axios
      .get("/api/rules/")
      .then((response) => {
        let noOfPages = Math.round(response.data.length/5);
        this.setState({
          rules: response.data,
          pages: noOfPages,
          loaded: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  clickUpHandler = () =>{
    this.setState({
      page: this.state.page + 1
    })
  }
  clickDownHandler = () =>{
    this.setState({
      page: this.state.page - 1
    })
  }
  componentDidMount() {
    this.getRules();
  }
  //will need to have an on mount function...
  render() {
    let isLoaded = <></>;
    if(this.state.loaded===true){
      isLoaded=<><RulesPage page={this.state.page} rules={this.state.rules}/>{this.state.page}</>
    } 
    console.log(this.state.rules)
    return (
      <div>
      <button onClick={this.clickDownHandler}>{this.state.page}</button>
      <button onClick={this.clickUpHandler}>{this.state.page}</button>
        {isLoaded}
      </div>
    );
  }
}
