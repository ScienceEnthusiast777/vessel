import React, { Component } from "react";
import RandomCard from "./RandomCard";

export default class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="BlackShadow">
          <div>
            <p>
              VESSEL IS A USER CREATED CARD GAME WHICH USES AN EVOLVING DATABASE
              OF CARDS, RANDOMLY GENERATED USING UPLOADED IMAGES
            </p>
            <p>
              VISIT THE FURNACE TO UPLOAD IMAGES TO BE FORGED INTO CARDS, AND
              THE OFFERINGS PAGE TO REQUEST PRINTABLE CARD SHEETS
            </p>
            <p>
              VISIT THE RULE SYSTEM PAGE TO POST YOUR OWN RULES, OR TO EXTEND
              OTHER PEOPLES
            </p>
          </div>
        </div>
        {<RandomCard className="RandomCard" />}
      </div>
    );
  }
}
