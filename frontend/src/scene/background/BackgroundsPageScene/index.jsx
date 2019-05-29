import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
// eslint-disable-next-line import/extensions
import backgroundsApi from "../../../api/backgrounds.js";

let background = "";
class backgroundsPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgrounds: [],
            page: 0,
            pages: 1
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
        backgroundsApi.backgrounds({ p: this.state.page, backgroundName: "" }).then((response) => {
            this.setState({
                pages: response.data.pages,
                backgrounds: response.data.backgrounds || []
            });
        });
    }

    static redirectToBackgrounds(id) {
        window.location.href = "/backgrounds/" + id;
    }

    search() {
        backgroundsApi.backgrounds({ p: this.state.page, backgroundName: background.value }).then((response) => {
            this.setState({
                backgrounds: response.data.backgrounds,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        backgroundsApi.backgrounds({ p: this.state.page, backgroundName: background.value }).then((response) => {
            this.setState({
                pages: response.data.pages,
                page,
                backgrounds: response.data.backgrounds
            });
        });
    }

    render() {
        const { backgrounds } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>All backgrounds</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-background">background:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="background"
                                        id="search-background" ref={(input) => { background = input; }}
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
                            <button className="btn btn-primary"
                                onClick={() => { window.location.href = "backgrounds/new"; }}>Create new background</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Data</th>
                                </tr>
                                {backgrounds === undefined ? <tr/> : backgrounds.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }}
                                        onClick={() => backgroundsPageScene.redirectToBackgrounds(item.id)}>
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

export default backgroundsPageScene;
