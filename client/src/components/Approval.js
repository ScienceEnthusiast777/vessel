import React, { Component } from "react";
import axios from 'axios';

export default class Approval extends Component {
  state = {
    extension: null,
    ruleId: "",
  };

  componentDidMount() {
    this.setState({
      extension: this.props.extension,
      ruleId: this.props.rule
    });
  }

  handleApproval = () =>{
    const {approved} = this.state.extension; 
    axios.put(`/api/rules/approve/${this.state.ruleId}`, {approved} )
    .then((response) => {
              this.props.history.push("/ruleslist");
    });
  }
  
  render() {
    return <div>
      {this.state.extension?<><button onClick={this.handleApproval}>approve {this.state.extension.extendedBy.username}'s extension of your rule system</button></>:<></>}
    </div>;
  }
}
