import React, { Component } from "react";
import axios from "axios";

export default class Offerings extends Component {
  state = {
    fileName: "",
  };

  Download = (e) => {
    var today = new Date();
    var nameForFile =
      today.getMonth() +
      "-" +
      today.getDate() +
      "-" +
      today.getFullYear() +
      "-" +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    this.setState({
      fileName: nameForFile,
    });
    axios
      .get(`/api/furnace/`)
      .then((res) => {
        console.log(res.data)
        // const url = window.URL.createObjectURL(new Blob([res.data]));
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", "some_file_name.ext");
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
      })
      // axios({
      //   url: `/api/furnace/offering/${this.state.fileName}`,
      //   method: "GET",
      //   responseType: "blob",
      // })
      //   .then((res) => {
      //     console.log('DATA HERE:', res.data)
      //     const url = window.URL.createObjectURL(new Blob([res.data]));
      //     const link = document.createElement("a");
      //     link.href = url;
      //     link.setAttribute("download", this.state.fileName);
      //     document.body.appendChild(link);
      //     link.click();
      //   })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <button onClick={this.Download}>Download</button>
      </div>
    );
  }
}
