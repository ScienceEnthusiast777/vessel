import React, { Component } from "react";

import axios from "axios";

export default class Offerings extends Component {
  state = {
    offerings: null,
    lesserOfferings: null,
    waiting: false,
  };

  download = (e) => {
    this.setState({ waiting: true });
    axios
      .get(`/api/furnace/`)
      .then((res) => {
        this.setState({
          waiting: false,
          offerings: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  lesserDownload = () => {
    this.setState({ waiting: true });
    axios
      .get("/api/furnace/lesser")
      .then((res) => {
        this.setState({
          waiting: false,
          lesserOfferings: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let isWaiting = <></>;
    let toImage = <></>;
    let toLesserImage = <></>;
    if (this.state.offerings) {
      toImage = (
        <a download="greater-offering.jpg" href={this.state.offerings}>
          A GREATER OFFERING
        </a>
      );
    }
    if (this.state.lesserOfferings) {
      toLesserImage = (
        <a download="lesser-offering.jpg" href={this.state.lesserOfferings}>
          A LESSER OFFERING
        </a>
      );
    }
    if (this.state.waiting === true) {
      isWaiting = <p>please wait</p>;
    }
    return (
      <div>
        <button onClick={this.download}>RECIEVE A GREATER OFFERING</button>
        {toImage}
        <button onClick={this.lesserDownload}>RECIEVE A LESSER OFFERING</button>
        {toLesserImage}
        {isWaiting}
      </div>
    );
  }
}
