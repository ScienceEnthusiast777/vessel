import React, { Component } from "react";
import RandomCard from "./RandomCard";

export default class Landing extends Component {
  render() {
    return (
      <div className="mt-20 h-screen">
        <div className="flex flex flex-col place-items-center justify-center sm:flex-col md:flex-col sm:place-items-center md:place-items-center lg:flex-row lg:justify-center font-bold font-bold">
          <div className="lg:w-1/4 md:w-1/2 sm:w-full p-1">
            <p className="m-1 mb-10">
              VESSEL IS A USER CREATED CARD GAME WHICH USES AN EVOLVING DATABASE
              OF CARDS, RANDOMLY GENERATED USING UPLOADED IMAGES
            </p>
            <p className="m-1 mb-10">
              VISIT THE FURNACE TO UPLOAD IMAGES TO BE FORGED INTO CARDS, AND
              THE OFFERINGS PAGE TO REQUEST PRINTABLE CARD SHEETS
            </p>
            <p className="m-1 pb-20">
              VISIT THE RULE SYSTEM PAGE TO POST YOUR OWN RULES, OR TO EXTEND
              OTHER PEOPLES
            </p>
          </div>
        {<RandomCard/>}
        </div>
      </div>
    );
  }
}
