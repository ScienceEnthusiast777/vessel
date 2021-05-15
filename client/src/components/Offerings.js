import React, { Component } from 'react'
import axios from 'axios';

export default class Offerings extends Component {

  state = {
    offerings: []
  }

  Download = (e) => {
    axios({url:'/api/furnace/', method: 'GET', responseType: 'blb'})
        .then((response) => console.log('processed the file: ',response.data))
        .catch((err)=>console.log(err));
  }
  
  render() {
    return (
      <div>
        <button onClick={this.Download}>Download</button>
      </div>
    )
  }
}
