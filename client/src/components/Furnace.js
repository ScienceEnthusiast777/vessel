import React, { Component } from "react";
import axios from "axios";

export default class Furnace extends Component {
  state = {
    file: null,
    loading: false
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
        .then((response) => console.log('processed the file: ',response.data))
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
    let uploadButton = <></>; 
    if(this.state.file){uploadButton = <button onClick={this.Upload}>upload</button>}
    return (
      <div className="Landing">
      <div className="BlackContainer">
      <form className="BlackShadow" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label htmlFor="file">File</label>
          <input type="file" accept=".jpg,.png" id="file" onChange={this.onChange} />
        </form>
        <div className="WhiteShadow">
          <p>-HERE YOU MAY OFFER UP YOUR IMAGES TO THE VESSEL'S FURNACE TO BE FORGED INTO NEW CARDS-</p>
          {uploadButton}
        </div>
      </div>
      </div>
    );
  }
}