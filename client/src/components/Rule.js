import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Approval from "./Approval";

export default class Rule extends Component {
  state = {
    rule: null,
    toBeApproved: null,
  };

  getRule = () => {
    axios
      .get(`/api/rules/rule/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          rule: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getRule();
  }
  render() {
    let canEdit = <></>;
    let isLoaded = <></>;
    let hasBeenExtended = <></>;

    if (this.state.rule) {
      isLoaded = (
        <>
          <h1 className="font-bold">{this.state.rule.name}</h1>
          <div className="border border-black border-5 p-5 mt-5">
            <p>{this.state.rule.explanation}</p>
          </div>
          <p className="italic font-thin">
            created by : {this.state.rule.createdBy.username}
          </p>
          <div className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 font-bold">
            <Link to={`/extend/${this.state.rule._id}`}>
              EXTEND THESE RULES
            </Link>
          </div>
        </>
      );
      if (this.props.user._id === this.state.rule.createdBy._id) {
        canEdit = (
          <div className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 font-bold">
            <Link to={`/edit/${this.state.rule._id}`}>EDIT THESE RULES</Link>
          </div>
        );
      }
      if (this.state.rule.extensions.length > 0) {
        hasBeenExtended = this.state.rule.extensions.map((extension) => {
          return (
            <div key={extension._id}>
              <h2 className="font-thin">Extension by {extension.extendedBy.username}:</h2>
              {extension.approved ? (
                <p className="font-thin">(approved by author)</p>
              ) : (
                <p className="font-thin">(awaiting approval)</p>
              )}
              <p className="pt-5 pb-5">{extension.extension}</p>
              {this.props.user._id === this.state.rule.createdBy._id &&
              extension.approved === false ? (
                <>
                  <Approval
                    history={this.props.history}
                    rule={this.state.rule._id}
                    extension={extension}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          );
        });
      }
    }

    return (
      <div className="flex flex-col items-center mt-20 h-screen">
        <div className="bg-white border border-black border-5 m-5 mt-20 mb-20 p-6">
          <div className="flex flex-col items-center">
            {isLoaded}
            {canEdit}
            {hasBeenExtended}
          </div>
        </div>
      </div>
    );
  }
}
