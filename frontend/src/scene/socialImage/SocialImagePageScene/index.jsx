import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import imagesApi from "../../../api/socialImages.js";

class SocialImagePageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {}
        };
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
        }
    }

    componentDidMount() {
        imagesApi.image(this.props.match.params.id).then((response) => {
            this.setState({
                image: response.data
            });
        });
    }

    render() {
        const { image } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>{"Icon " + image.id}</h4>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Url</label>
                        </div>
                        <div className="col-6">
                            <label>{image.url}</label>
                            <img src={image.url} alt="img" height="50" />
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default SocialImagePageScene;
