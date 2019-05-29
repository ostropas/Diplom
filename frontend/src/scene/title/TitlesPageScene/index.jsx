import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
import titlesApi from "../../../api/titles";

let Title = "";
class TitlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
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
        titlesApi.titles({ p: this.state.page, title: "" }).then((response) => {
            this.setState({
                titles: response.data.values,
                pages: response.data.pages
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToTitle(id) {
        window.location.href = "/titles/" + id;
    }

    search() {
        titlesApi.titles({ p: 0, title: Title.value }).then((response) => {
            this.setState({
                titles: response.data.values,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        titlesApi.titles({ p: page, title: Title.value }).then((response) => {
            this.setState({
                titles: response.data.values,
                pages: response.data.pages,
                page
            });
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>Titles list</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-title">Title:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="title"
                                        id="search-title" ref={(input) => { Title = input; }}
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
                            <button className="btn btn-primary" onClick={() => { window.location.href = "titles/new"; }}
                            >Create new title</button>
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
                                {this.state.titles === undefined ? <tr></tr> : this.state.titles.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => { this.redirectToTitle(item.id); }}>
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

export default TitlesPage;
