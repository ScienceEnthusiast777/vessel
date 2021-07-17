import React, { Component } from "react";
import axios from 'axios';

export default class Approval extends Component {
  state = {
    extension: null,
    ruleId: "",
  };

  componentDidMount() {
    this.setState({
      index: this.props.index,
      extension: this.props.extension,
      ruleId: this.props.rule
    });
  }

  handleApproval = () =>{
    const _id = this.state.extension._id;
    axios.put(`/api/rules/approve/${this.state.ruleId}`, {_id} )
    .then((response) => {
      this.props.history.push("/ruleslist");
    });
  }

  render() {
    return <div>
      {this.state.extension?<><button className="cursor-pointer border font-bold hover:border-black p-2" onClick={this.handleApproval}>approve {this.state.extension.extendedBy.username}'s extension of your rule system</button></>:<></>}
    </div>;
  }
}
