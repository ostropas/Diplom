import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
// eslint-disable-next-line import/extensions
import iconsApi from "../../../api/icons.js";

let Icon = "";
class IconsPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [],
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
        iconsApi.icons({ p: this.state.page, iconName: "" }).then((response) => {
            this.setState({
                pages: response.data.pages,
                icons: response.data.icons === undefined ? [] : response.data.icons
            });
        });
    }

    static redirectToIcons(id) {
        window.location.href = "/icons/" + id;
    }

    search() {
        iconsApi.icons({ p: 0, iconName: Icon.value }).then((response) => {
            this.setState({
                icons: response.data.icons === undefined ? [] : response.data.icons,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        iconsApi.icons({ p: page, iconName: Icon.value }).then((response) => {
            this.setState({
                pages: response.data.pages,
                page,
                icons: response.data.icons === undefined ? [] : response.data.icons
            });
        });
    }

    render() {
        const { icons } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>All icons</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-icon">Icon:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="icon" id="search-icon"
                                        ref={(input) => { Icon = input; }}
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
                                onClick={() => { window.location.href = "icons/new"; }}>Create new icon</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Data</th>
                                </tr>
                                {icons.length === 0 ? <tr/> : icons.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => IconsPageScene.redirectToIcons(item.id)}>
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

export default IconsPageScene;
