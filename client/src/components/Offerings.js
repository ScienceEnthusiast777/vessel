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
        <a className="border border-5 border-black font-bold p-1" download="greater-offering.jpg" href={this.state.offerings}>
          A GREATER OFFERING
        </a>
      );
    }
    if (this.state.lesserOfferings) {
      toLesserImage = (
        <a className="border border-5 border-black font-bold p-1" download="lesser-offering.jpg" href={this.state.lesserOfferings}>
          A LESSER OFFERING
        </a>
      );
    }
    if (this.state.waiting === true) {
      isWaiting = <><div className="border border-5 border-white rounded-lg"><img height="100px" src="/images/loading.gif" alt="loading" /></div></>;
    }
    return (
      <div className="flex flex-col items-center mt-20 h-screen">
        <div className="w-1/2 bg-white border border-black flex flex-col items-center m-5 mt-20 mb-20 p-2">
          <div className="flex flex-col items-center m-5 mt-5 mb-5">
            <button className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44  font-bold" onClick={this.download}>RECIEVE A GREATER OFFERING</button>
            {toImage}
          </div>
          <div className="flex flex-col items-center m-5 mt-5 mb-5">
            <button className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44  font-bold" onClick={this.lesserDownload}>
              RECIEVE A LESSER OFFERING
            </button>
            {toLesserImage}
          </div>
          <div className="font-bold p-3">
            <p>-Here you can download a 'Greater Offering': printable sheets drawn at random from the database of user generated cards. Or a 'Lesser Offering': printable sheets of supplementary cards with randomly generated suits-</p>
          </div>
          {isWaiting}
        </div>
      </div>
    );
  }
}
