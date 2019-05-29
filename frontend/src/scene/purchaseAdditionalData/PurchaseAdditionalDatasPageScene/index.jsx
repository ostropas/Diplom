import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
// eslint-disable-next-line import/extensions
import padsApi from "../../../api/purchaseAdditionalData.js";

const offerTypes = new Map([[1, "currency offer"], [2, "novice pack"], [3, "offer"], [4, "special offer"]]);
let Pad = "";
class PurchaseAdditionalDatasPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [],
            page: 0,
            pages: 1,
            offerTypes: []
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
        padsApi.purchaseAdditionalDatas({ p: this.state.page, title: "" }).then((response) => {
            this.setState({
                pages: response.data.pages,
                pads: response.data.pads === undefined ? [] : response.data.pads
            });
        });
    }

    static redirectToPads(id) {
        window.location.href = "/purchaseAdditionalDatas/" + id;
    }

    search() {
        padsApi.purchaseAdditionalDatas({ p: 0, title: Pad.value }).then((response) => {
            this.setState({
                padss: response.data.pads === undefined ? [] : response.data.pads,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        padsApi.purchaseAdditionalDatas({ p: page, title: Pad.value }).then((response) => {
            this.setState({
                pages: response.data.pages,
                page,
                pads: response.data.pads === undefined ? [] : response.data.pads
            });
        });
    }

    render() {
        const { pads } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>All social purchase</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-pad">social purchase:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="pad" id="search-pad" ref={(input) => { Pad = input; }}
                                        onKeyDown={(e) => { if (e.keyCode === 13) this.search(); }} />
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary" onClick={() => this.search()}>Search</button>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-row">
                            <button className="btn btn-primary"onClick={() => { window.location.href = "/purchaseAdditionalDatas/new"; }}
                            >Create new social purchase</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Type</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                </tr>
                                {pads.length === 0 ? <tr/> : pads.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }}
                                        onClick={() => PurchaseAdditionalDatasPageScene.redirectToPads(item.id)}>
                                        <td>{item.id}</td>
                                        <td>{offerTypes.get(item.type)}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td><img src={item.photo_url} alt="img" height="50" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        page={this.state.page}
                        pages={this.state.pages}
                        setPage={this.setPage.bind(this)}
                    />
                </div>
            </MainContainer>
        );
    }
}

export default PurchaseAdditionalDatasPageScene;
