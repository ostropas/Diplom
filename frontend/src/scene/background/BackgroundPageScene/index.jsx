import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import backgroundsApi from "../../../api/backgrounds.js";

class backgroundPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: {}
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
        backgroundsApi.background(this.props.match.params.id).then((response) => {
            this.setState({
                background: response.data
            });
        });
    }

    render() {
        const { background } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>{"background " + background.id}</h4>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Data</label>
                        </div>
                        <div className="col-6">
                            <label>{background.data}</label>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default backgroundPageScene;
