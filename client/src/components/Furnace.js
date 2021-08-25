import React, { Component } from "react";
import axios from "axios";

export default class Furnace extends Component {
  state = {
    file: null,
    loading: false,
  };

  Upload = (e) => {
    let file = this.state.file;
    if (file) {
      this.setState({
        loading: true,
      });
      let data = new FormData();
      data.append("name", this.state.file.name);
      data.append("file", file);
      axios
        .post("/api/furnace", data)
        .then((response) => {
          console.log("processed the file: ", response.data);
          this.setState({
            loading: false,
            file: null,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  onChange = (e) => {
    const f = e.target.files[0];
    this.setState({
      file: f,
    });
  };

  render() {
    let isLoading = <></>;
    let uploadButton = <></>;
    if (this.state.loading) {
      isLoading = (
        <>
          <div>
            <img className="border border-5 border-white rounded-lg" height="100px" src="/images/loading.gif" alt="loading" />
          </div>
        </>
      );
    }
    if (this.state.file) {
      uploadButton = <button className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44" onClick={this.Upload}>upload</button>;
    }
    return (
      <div className="flex flex-col items-center mt-20 h-screen">
        <div className="bg-white flex flex-col items-center border border-black border-5 m-5 mt-20 mb-20 p-3">
          <form
            className="flex flex-col items-center w-52 font-bold"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <label htmlFor="file">File</label>
            <input
              className="border border-black"
              type="file"
              accept=".jpg,.png"
              id="file"
              onChange={this.onChange}
            />
          </form>
          <div className="flex flex-col items-center font-bold mt-3">
            <p>
              -Here you can upload images that will be used to generate new cards and added to the Vessel's database. Each card has a selection of symbols and numbers generated at random-
            </p>
            {uploadButton}
            {isLoading}
          </div>
        </div>
      </div>
    );
  }
}
