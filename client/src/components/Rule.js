import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Approval from "./Approval"

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
        console.log("this is the state", this.state.rule.extensions.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getRule();
    console.log(this.props.user);
  }
  render() {
    let canEdit = <></>;
    let isLoaded = <></>;
    let hasBeenExtended = <></>;
    // let canApprove = <></>;

    if (this.state.rule) {
      isLoaded = (
        <>
          <h1>{this.state.rule.name}</h1>
          <h3>{this.state.rule.explanation}</h3>
          <p>created by : {this.state.rule.createdBy.username}</p>
          <Link to={`/extend/${this.state.rule._id}`}>EXTEND THESE RULES</Link>
        </>
      );
      if (this.props.user._id === this.state.rule.createdBy._id) {
        canEdit = (
          <>
            <Link to={`/edit/${this.state.rule._id}`}>EDIT</Link>
          </>
        );
        // canApprove = (
        //   <>
        //     <Approval extension={}/>
        //   </>
        // );
      }
      if (this.state.rule.extensions.length > 0) {
        hasBeenExtended = this.state.rule.extensions.map((extension) => {
          return (
            <div key={extension._id}>
              <h2>Extension by {extension.extendedBy.username}</h2>
              <p>{extension.extension}</p>
              {this.props.user._id === this.state.rule.createdBy._id? <><Approval history ={this.props.history} rule={this.state.rule._id} extension={extension}/></>:<></>}
            </div>
          );
        });
      }
    }

    return (
      <div>
        {isLoaded}
        {canEdit}
        {hasBeenExtended}
      </div>
    );
  }
}
