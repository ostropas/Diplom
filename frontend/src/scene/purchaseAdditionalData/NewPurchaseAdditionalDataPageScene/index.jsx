import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import padsApi from "../../../api/purchaseAdditionalData.js";

class NewPurchaseAdditionalDataPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offersTitles: [],
            images: [],
            id: -1,
            title: "",
            description: "",
            photo_url: ""
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
        padsApi.getNewPadData().then((response) => {
            this.setState({
                offersTitles: response.data.titleKeys,
                images: response.data.images
            });
        });
    }

    CreateNewPad() {
        const {
            // eslint-disable-next-line camelcase
            id, title, description, photo_url
        } = this.state;
        // eslint-disable-next-line camelcase
        if (parseInt(id, 10) === -1 || title === "" || description === "" || photo_url === "") { alert("fill all fields"); }

        padsApi.addPurchaseAdditionalDatas({
            id, title, description, photo_url
        }).then(() => {
            window.location.href = "/purchaseAdditionalDatas/";
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>Create new social purchase</h4>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="title">title</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" id="title"
                                        onChange={(e) => { this.setState({ title: e.target.value }); }}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="description">description</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" id="description"
                                        onChange={(e) => { this.setState({ description: e.target.value }); }}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="id">id (offer)</label>
                                </div>
                                <div className="col-4">
                                    <select className="custom-select" onBlur={(e) => { this.setState({ id: e.target.value }); }}>
                                        <option value={-1}>Select value</option>
                                        {this.state.offersTitles.map(i => (
                                            <option value={i[0]}>{i[1] + " id:" + i[0]}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="url">image url</label>
                                </div>
                                <div className="col-4">
                                    <select className="custom-select" onBlur={(e) => { this.setState({ photo_url: e.target.value }); }}>
                                        <option value={""}>Select value</option>
                                        {this.state.images.map(i => (
                                            <option value={i.url}>{i.url}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <button className="btn btn-primary" onClick={() => { this.CreateNewPad(); }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewPurchaseAdditionalDataPageScene;
