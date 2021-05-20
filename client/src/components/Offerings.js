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
      isWaiting = <><div className="WhiteShadow"><img height="100px" src="/images/loading.gif" alt="loading" /><p>LOADING</p></div></>;
    }
    return (
      <div className="Landing">
        <div className="BlackContainer">
          <div className="BlackShadow">
            <button onClick={this.download}>RECIEVE A GREATER OFFERING</button>
            {toImage}
          </div>
          <div className="BlackShadow">
            <button onClick={this.lesserDownload}>
              RECIEVE A LESSER OFFERING
            </button>
            {toLesserImage}
          </div>
          {isWaiting}
          <div className="WhiteShadow">
            <p>-HERE YOU MAY REQUEST A GREATER OFFERING OF CARDS FORGED IN THE FURNACE, OR A LESSER OFFERING OF SUPPLEMENTARY CARDS-</p>
          </div>
        </div>
      </div>
    );
  }
}
