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
      // console.log(this.state.card)
    })
    .catch((err)=>{console.log(err)})
  }

  render() {
    let cardDisplay = <></>;
    if (this.state.card) {
      cardDisplay = <><img className="RandomCardImage" src={this.state.card} alt="" /></>;
      console.log('done')
    }
    return <div>
      {cardDisplay}
    </div>;
  }
}
