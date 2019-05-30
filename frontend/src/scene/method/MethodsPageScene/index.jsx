import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
import playersApi from "../../../api/players";

const OrderBy = {
    Id: 1,
    PublicId: 2,
    Name: 3,
    Level: 4,
    Tutor: 5
};

let Nickname = "";
class MethodsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            page: 0,
            pages: 1,
            playersCount: 0,
            playersOrderBy: 1,
            descSort: false
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
        playersApi.players({ p: this.state.page, nickname: "" }).then((response) => {
            playersApi.countPlayers().then((countResponse) => {
                this.setState({
                    players: response.data.players,
                    pages: response.data.pages,
                    playersCount: countResponse.data.count
                });
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToPlayer(_id) {
        window.location.href = "/players/" + _id;
    }

    search() {
        playersApi.players({ p: 0, nickname: Nickname.value }).then((response) => {
            this.setState({
                players: response.data.players,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        playersApi.players({ p: page, nickname: Nickname.value }).then((response) => {
            this.setState({
                players: response.data.players,
                pages: response.data.pages,
                page
            });
        });
    }

    saveOrder(event) {
        const order = Number(event.target.value);
        playersApi.players({
            p: 0,
            nickname: Nickname.value,
            order,
            descSort: this.state.descSort
        }).then((response) => {
            this.setState({
                players: response.data.players,
                pages: response.data.pages,
                page: 0,
                playersOrderBy: order
            });
        });
    }

    saveSort(event) {
        const desc = event.target.checked;
        playersApi.players({
            p: 0,
            nickname: Nickname.value,
            order: this.state.playersOrderBy,
            descSort: desc
        }).then((response) => {
            this.setState({
                players: response.data.players,
                pages: response.data.pages,
                page: 0,
                descSort: desc
            });
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>Players list</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-nickname">Nickname:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="nickname"
                                        id="search-nickname" ref={(input) => { Nickname = input; }}
                                        onKeyDown={(e) => { if (e.keyCode === 13) this.search(); }}></input>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary" onClick={() => this.search()}>Search</button>
                                </div>
                                <div className="col-10">
                                    <label>All players: {this.state.playersCount}</label>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="OrderBy">Order by:</label>
                                </div>
                                <select className="custom-select col-4" id="OrderBy" value={this.state.playersOrderBy}
                                    onChange={this.saveOrder.bind(this)}>
                                    <option value={OrderBy.Id}>Id</option>
                                    <option value={OrderBy.Level}>Level</option>
                                    <option value={OrderBy.Name}>Name</option>
                                    <option value={OrderBy.PublicId}>PublicId</option>
                                    <option value={OrderBy.Tutor}>Tutuor</option>
                                </select>
                                <div className="col-1">
                                    <label htmlFor="DESC">Desc:</label>
                                </div>
                                <div className="col-2" id="DESC">
                                    <input type="checkbox" onChange={this.saveSort.bind(this)} checked={this.state.descSort}/>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Public id</th>
                                    <th>Name</th>
                                    <th>Level</th>
                                    <th>Tutorial stage</th>
                                </tr>
                                {this.state.players.map((item, index) => (
                                    // eslint-disable-next-line no-underscore-dangle
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => { this.redirectToPlayer(item._id); }}>
                                        <td>{item.id}</td>
                                        <td>{item.public_id}</td>
                                        <td>{item.nickname}</td>
                                        <td>{item.level}</td>
                                        <td>{item.tutorial_stage}</td>
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

export default MethodsPage;
