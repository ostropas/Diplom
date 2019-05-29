import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import playersApi from "../../../api/players";

let player = {};
let resources = [];
let submitButton = "";

const Platforms = [
    "UNDEFIND",
    "IOS",
    "Android",
    "OK",
    "VK",
    "FB"
];

class PlayerPage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            player: {},
            resources: [],
            resourceStorages: [],
            transactions: [],
            transactionsLimit: 10
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
        // eslint-disable-next-line no-underscore-dangle
        this._isMounted = true;

        playersApi.player(this.props.match.params.id).then((response) => {
            playersApi.getTransactions(response.data.player.id, this.state.transactionsLimit).then((transactionsResponse) => {
                // eslint-disable-next-line no-underscore-dangle
                if (this._isMounted) {
                    this.setState({
                        player: response.data.player,
                        resources: response.data.resources,
                        resourceStorages: response.data.resourceStorages,
                        transactions: transactionsResponse.data
                    });
                }
            });
        });
    }

    componentWillUnmount() {
        // eslint-disable-next-line no-underscore-dangle
        this._isMounted = false;
    }

    // eslint-disable-next-line class-methods-use-this
    deletePlayer(id) {
        // eslint-disable-next-line no-alert
        if (window.confirm("Are you sure you want to delete player?")) {
            playersApi.delPlayer(id).then(() => {
                window.location.href = "/players";
            });
        }
    }

    changePlayer() {
        submitButton.innerHTML = "Saving...";
        player.level = player.level.value;
        player.nickname = player.nickname.value;
        player.tutorial_stage = player.tutorial_stage.value;
        const resourceRequest = {};
        resources.forEach((item) => {
            const localItem = item;
            localItem.count = item.count.value;
            resourceRequest["resource_" + localItem.itm_id] = localItem.count;
        });


        const request = {
            level: player.level,
            nickname: player.nickname,
            tutorial_stage: player.tutorial_stage
        };
        Object.assign(request, resourceRequest);
        playersApi.changePlayer(this.props.match.params.id, request).then(() => {
            submitButton.innerHTML = "Saved";
            setTimeout(() => {
                submitButton.innerHTML = "Submit changes";
                playersApi.player(this.props.match.params.id).then((response) => {
                    this.setState({
                        player: response.data.player,
                        resources: response.data.resources,
                        resourceStorages: response.data.resourceStorages
                    });
                });
            }, 1500);
        });
    }

    render() {
        // eslint-disable-next-line prefer-destructuring
        player = this.state.player;
        // eslint-disable-next-line prefer-destructuring
        resources = this.state.resources;
        const groups = [];
        resources.forEach((item) => {
            if (groups[item.subtype_id] === undefined) { groups[item.subtype_id] = []; }
            groups[item.subtype_id].push(item);
        });

        return (
            <MainContainer>
                {resources.length === 0 ? "" :
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <h4 id="player_id">{this.state.player.id}</h4>
                        </div>
                        <div className="row">
                            <div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <label htmlFor="playerDataInputLevel">level</label>
                                    </div>
                                    <div className="col-6" key={player.level}>
                                        <input className="form-control" type="text" name="level" id="playerDataInputLevel"
                                            defaultValue={player.level} ref={(input) => { player.level = input; }}/>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-6">
                                        <label htmlFor="playerDataInputtutorial_stage">tutorial stage</label>
                                    </div>
                                    <div className="col-6" key={player.tutorial_stage}>
                                        <input className="form-control" type="text" name="tutorial_stage" id="playerDataInputtutorial_stage"
                                            defaultValue={player.tutorial_stage} ref={(input) => { player.tutorial_stage = input; }} />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-6">
                                        <label htmlFor="playerDataInputnickname">nickname</label>
                                    </div>
                                    <div className="col-6" key={player.nickname}>
                                        <input className="form-control" type="text" name="nickname" id="playerDataInputnickname"
                                            defaultValue={player.nickname} ref={(input) => { player.nickname = input; }} />
                                    </div>
                                </div>
                                <br />

                                <div className="form-row">
                                    <div className="col-6">
                                        <label>Building silo</label>
                                    </div>
                                    <div className="col-6">
                                        <label>{this.state.resourceStorages[0].CurrentCapacity + "/" + this.state.resourceStorages[0].Capacity}</label>
                                    </div>
                                </div>
                                <br />

                                <div className="form-row">
                                    <div className="col-6">
                                        <label>Building barn</label>
                                    </div>
                                    <div className="col-6">
                                        <label>{this.state.resourceStorages[1].CurrentCapacity + "/" + this.state.resourceStorages[1].Capacity}</label>
                                    </div>
                                </div>
                                <br />

                                <div>
                                    {groups.map((item, index) => <div key={index}>
                                        <div className="form-row">
                                            <p className="h4">{item[0].subtype_name.replace(/_/g, " ")}</p>
                                        </div>

                                        {item.map(resource => (
                                            <div className="form-row" key={resource.itm_id}>
                                                <div className="col-6">
                                                    <label htmlFor={"resourceInput" + resource.itm_id}>{resource.type_name}</label>
                                                </div>
                                                <div className="col-6"
                                                    key={resources.find(resourceItem => resourceItem.itm_id === 11).count}>
                                                    <input className="form-control" type="text" id={"resourceInput" + resource.itm_id}
                                                        // eslint-disable-next-line no-param-reassign
                                                        defaultValue={resource.count} ref={(input) => { resource.count = input; }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>)}
                                    <br />
                                </div>


                                <div className="form-row">
                                    <div className="col-6">
                                        <button className="btn btn-primary" ref={(input) => { submitButton = input; }}
                                            onClick={() => { this.changePlayer(); }} type="submit">Submit changes</button>
                                    </div>
                                    <div className="col-6">
                                        <input className="btn btn-danger"onClick={() => { this.deletePlayer(this.state.player.id); }}
                                            type="button" name="delete_player_data_button"
                                            value="Delete player" id="delete_player_data_button_id"></input>
                                    </div>
                                </div>
                                <br />

                                <div className="form-row">
                                    <p className="h4">Transactions</p>
                                </div>
                                <div className="row">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Is transaction finshed</th>
                                                <th>Product identifier</th>
                                                <th>time</th>
                                                <th>Transaction Id</th>
                                                <th>Platform</th>
                                                <th>Offer Id</th>
                                            </tr>
                                            {this.state.transactions.map((item, index) => (
                                                // eslint-disable-next-line no-underscore-dangle
                                                <tr key={index}>
                                                    <td>{item.confirmation_state === 2 ? "Yes" : "No"}</td>
                                                    <td>{item.product_identifier}</td>
                                                    <td>{item.time}</td>
                                                    <td>{item.transaction_identifier}</td>
                                                    <td>{Platforms[item.platform - 1]}</td>
                                                    <td style={{ cursor: "pointer", color: "blue" }} onClick={() => { if (item.admin_pack_id !== undefined) window.location.href = "/offers/" + item.admin_pack_id; }}>{item.admin_pack_id === undefined ? "null" : item.admin_pack_id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                }
            </MainContainer>
        );
    }
}

export default PlayerPage;
