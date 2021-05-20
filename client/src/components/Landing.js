import React, { Component } from 'react'
import RandomCard from './RandomCard'

export default class Landing extends Component {
  render() {
    return (
      <div className="Landing" >
        {/* <img src="./images/landing.jpg" alt="" /> */}
        {<RandomCard className="RandomCard"/>}
      </div>
    )
  }
}
