import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import padsApi from "../../../api/purchaseAdditionalData.js";

const offerTypes = new Map([[1, "currency offer"], [2, "novice pack"], [3, "offer"], [4, "special offer"]]);

class PurchaseAdditionalDataScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pad: {}
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
        padsApi.purchaseAdditionalData(this.props.match.params.id).then((response) => {
            this.setState({
                pad: response.data
            });
        });
    }

    render() {
        const { pad } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>{"Social data " + pad.id}</h4>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>title</label>
                        </div>
                        <div className="col-6">
                            <label>{pad.title}</label>
                        </div>
                        <div className="col-6">
                            <label>type</label>
                        </div>
                        <div className="col-6">
                            <label>{offerTypes.get(pad.type)}</label>
                        </div>
                        <div className="col-6">
                            <label>description</label>
                        </div>
                        <div className="col-6">
                            <label>{pad.description}</label>
                        </div>
                        <div className="col-6">
                            <label>img</label>
                        </div>
                        <div className="col-6">
                            <img src={pad.photo_url} alt="img" height="100" />
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default PurchaseAdditionalDataScene;
