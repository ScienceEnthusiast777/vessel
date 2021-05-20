import React, { Component } from "react";
import RandomCard from "./RandomCard";

export default class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="BlackShadow">
          <p>kjhasdkjhakdjhakdjhasdjkh</p>
        </div>
        {<RandomCard className="RandomCard" />}
      </div>
    );
  }
}
