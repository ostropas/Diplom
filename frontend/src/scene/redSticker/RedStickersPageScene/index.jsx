import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
import redStickersApi from "../../../api/redStickers";

let RedSticker = "";
class RedStickersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redStickers: [],
            page: 0,
            pages: 1
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
        redStickersApi.redStickers({ p: this.state.page, redSticker: "" }).then((response) => {
            this.setState({
                redStickers: response.data.values,
                pages: response.data.pages
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToRedSticker(id) {
        window.location.href = "/redStickers/" + id;
    }

    search() {
        redStickersApi.redStickers({ p: 0, RedSticker: RedSticker.value }).then((response) => {
            this.setState({
                redStickers: response.data.values,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        redStickersApi.redStickers({ p: page, redSticker: RedSticker.value }).then((response) => {
            this.setState({
                redStickers: response.data.values,
                pages: response.data.pages,
                page
            });
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>RedStickers list</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-redSticker">RedSticker:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="redSticker"
                                        id="search-redSticker" ref={(input) => { RedSticker = input; }}
                                        onKeyDown={(e) => { if (e.keyCode === 13) this.search(); }}></input>
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
                            <button className="btn btn-primary" onClick={() => { window.location.href = "redStickers/new"; }}
                            >Create new redSticker</button>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Key</th>
                                </tr>
                                {this.state.redStickers === undefined ? <tr></tr> : this.state.redStickers.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => { this.redirectToRedSticker(item.id); }}>
                                        <td>{item.id}</td>
                                        <td>{item.data}</td>
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

export default RedStickersPage;
