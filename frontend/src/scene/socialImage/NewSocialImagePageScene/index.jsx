import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import imagesApi from "../../../api/socialImages.js";

let url = "";
class NewSocialImagePageScene extends Component {
    // eslint-disable-next-line class-methods-use-this
    CreateNewImage() {
        imagesApi.addImage({ url: url.value }).then((response) => {
            window.location.href = "/socialImages/" + response.data;
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>Create new social image</h4>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="url">Url</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" id="url"
                                        ref={(input) => { url = input; }}/>
                                </div>
                                <div className="col-6">
                                    <label>check url valid</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <button className="btn btn-primary" onClick={() => { this.CreateNewImage(); }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewSocialImagePageScene;
