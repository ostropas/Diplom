import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import iconsApi from "../../../api/icons.js";

class IconPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: {}
        };
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            // eslint-disable-next-line no-alert
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
        }
    }

    componentDidMount() {
        iconsApi.icon(this.props.match.params.id).then((response) => {
            this.setState({
                icon: response.data
            });
        });
    }

    render() {
        const { icon } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>{"Icon " + icon.id}</h4>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Data</label>
                        </div>
                        <div className="col-6">
                            <label>{icon.data}</label>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default IconPageScene;
