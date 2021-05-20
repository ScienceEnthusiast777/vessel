import axios from "axios";
import React, { Component } from "react";

export default class RandomCard extends Component {
  state = {
    card: null,
  };

  componentDidMount(){
    axios.get('/api/furnace/landing')
    .then((response)=>{
      this.setState({card: response.data})
    })
    .catch((err)=>{console.log(err)})
  }

  render() {
    let cardDisplay = <></>;
    if (this.state.card) {
      cardDisplay = <><img className="RandomCardImage" src={this.state.card} alt="" /></>;
    }
    return <div>
      {cardDisplay}
    </div>;
  }
}
