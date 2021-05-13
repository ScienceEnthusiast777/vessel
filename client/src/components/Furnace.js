import React, { Component } from "react";
import axios from "axios";

export default class jimp extends Component {
  state = {
    file: null,
  };

  Upload = (e) => {
    console.log(this.state.file.name)
    let file = this.state.file;
    if (file) {
      let data = new FormData();
      data.append("name", this.state.file.name)
      data.append("file", file);
      axios
        .post("/api/furnace", data)
        .then((response) => console.log(response))
        .catch((err)=>console.log(err));
    }
  }

    onChange = (e) => {
      const f = e.target.files[0];
      console.log(f)
      this.setState({
        file: f
      });
    };
  

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label htmlFor="file">File</label>
          <input type="file" id="file" onChange={this.onChange} />
        </form>
        <button onClick={this.Upload}>upload</button>
      </div>
    );
  }
}