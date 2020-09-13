import React, { Component } from "react";
import Loader from "../Loader";
import ImageButton from "./ImageButton";
import * as api from "../../utils/api";

export default class ImageAdder extends Component {
  state = {
    uploading: false,
    image: "",
  };

  onChange = (e) => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    formData.append("image", files[0]);

    api
      .addPhoto(this.props.meal_id, formData)
      .then((res) => {
        return res.data.meal.imgURL;
      })
      .then((url) => {
        this.setState({
          uploading: false,
          image: url,
        });
      });
  };

  // removeImage = (id) => {
  //   this.setState({
  //     images: this.state.images.filter((image) => image.public_id !== id),
  //   });
  // };

  render() {
    const { uploading, image } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Loader />;
        case image !== "":
          return <img src={image} alt="meal" width="128" height="128" />;
        default:
          return (
            <ImageButton
              onChange={this.onChange}
              loggedInUser={this.props.loggedInUser}
            />
          );
      }
    };

    return (
      <div>
        <div className="buttons">{content()}</div>
      </div>
    );
  }
}
