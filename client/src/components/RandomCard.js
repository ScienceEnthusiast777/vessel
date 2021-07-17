import axios from "axios";
import React, { Component } from "react";

export default class RandomCard extends Component {
  state = {
    card: null,
  };

  getCard = () =>{
    axios.get('/api/furnace/landing')
    .then((response)=>{
      this.setState({card: response.data})
    })
    .catch((err)=>{console.log(err)})
  }

  componentDidMount(){
    this.getCard();
  }

  render() {
    let cardDisplay = <></>;
    if (this.state.card) {
      cardDisplay = <><img src={this.state.card} alt="" /></>;
    }
    return <div className="w-4/5 lg:w-1/5 md:w-1/2 sm:h-1/2 p-1 bg-black border border-5 border-black rounded-lg">
      {cardDisplay}
    </div>;
  }
}
