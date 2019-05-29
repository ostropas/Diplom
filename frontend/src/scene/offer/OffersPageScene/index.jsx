import React, { Component } from "react";
import moment from "moment";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
import offersApi from "../../../api/offers";
import { constants } from "os";

let Title = "";
class OfferssPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            offersTitles: [],
            offersPrices: [],
            page: 0,
            pages: 1,
            enable: undefined
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
        offersApi.offers({
            title: "",
            p: this.state.page,
            enable: this.state.enable
        }).then((response) => {
            this.setState({
                offers: response.data.offers,
                offersTitles: response.data.offersTitles,
                offersPrices: response.data.offersPrices,
                pages: response.data.pages
            });
        });
    }

    search() {
        offersApi.offers({
            title: Title.value,
            p: 0,
            enable: this.state.enable
        }).then((response) => {
            this.setState({
                offers: response.data.offers,
                pages: response.data.pages,
                offersTitles: response.data.offersTitles,
                offersPrices: response.data.offersPrices,
                page: 0
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToOffer(id) {
        window.location.href = "/offers/" + id;
    }

    setPage(page) {
        offersApi.offers({
            title: Title.value,
            p: page,
            enable: this.state.enable
        }).then((response) => {
            this.setState({
                offers: response.data.offers,
                pages: response.data.pages,
                page,
                offersTitles: response.data.offersTitles,
                offersPrices: response.data.offersPrices
            });
        });
    }

    filterOffers(e) {
        let enable;
        if (e.target.value === "actual") {
            enable = true;
        } else if (e.target.value === "archive") {
            enable = false;
        }

        this.setState({
            enable
        });

        offersApi.offers({
            title: Title.value,
            p: this.state.page,
            enable
        }).then((response) => {
            this.setState({
                offers: response.data.offers,
                offersTitles: response.data.offersTitles,
                offersPrices: response.data.offersPrices,
                pages: response.data.pages
            });
        });
    }

    render() {
        function offerTimeToUnixTime(offer) {
            let time = 0;

            time += offer.time_duration.years === undefined ? 0 : offer.time_duration.years * 31556926;
            time += offer.time_duration.months === undefined ? 0 : offer.time_duration.months * 2592000;
            time += offer.time_duration.days === undefined ? 0 : offer.time_duration.days * 86400;
            time += offer.time_duration.hours === undefined ? 0 : offer.time_duration.hours * 60;
            time += offer.time_duration.minutes === undefined ? 0 : offer.time_duration.minutes;

            return time;
        }

        function getExpireDate(offer) {
            const unixTime = Number(offerTimeToUnixTime(offer)) + Number(moment(offer.start_time).format("X"));
            return moment(unixTime * 1000).format("YYYY-MM-DD HH:mm");
        }

        function timeFormat(offer) {
            let formatTimeDuration = "";            
            if (offer.time_duration) {
                formatTimeDuration = Object.keys(offer.time_duration).reduce((acc, curr) => {
                    // eslint-disable-next-line no-param-reassign
                    acc += `${curr} ${offer.time_duration[curr]} `;
                    return acc;
                }, "");
            }

            return formatTimeDuration;
        }

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>List of all offers</h4></div>
                    <div className="row">
                        <div id="form-user-login">
                            <div className="form-row">
                                <div className="col-4">
                                    <label htmlFor="search-nickname">Title:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="nickname"
                                        id="search-nickname" ref={(input) => { Title = input; }}
                                        onKeyDown={(e) => { if (e.keyCode === 13) this.search(); }}></input>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary" onClick={() => this.search()}>Search</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <button className="btn btn-primary"
                                    onClick={() => { window.location.href = "offers/new"; }}>Create offer</button>
                            </div>
                            <br />
                        </div>
                        <div className="radio" style={{ paddingRight: 10 }}>
                            <label><input type="radio" name="optradio" value="all" onChange={this.filterOffers.bind(this)} /> All</label>
                        </div>
                        <div className="radio" style={{ paddingRight: 10 }}>
                            <label><input type="radio" name="optradio" value="actual"
                                onChange={this.filterOffers.bind(this)} /> Actual </label>
                        </div>
                        <div className="radio" style={{ paddingRight: 10 }}>
                            <label><input type="radio" name="optradio" value="archive"
                                onChange={this.filterOffers.bind(this)} /> Archive </label>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Priority</th>
                                    <th>Old price tier</th>
                                    <th>Old price comment</th>
                                    <th>New price tier</th>
                                    <th>New price comment</th>
                                    <th>Timer start</th>
                                    <th>Time duration</th>
                                    <th>Expire at</th>
                                    <th>Enable</th>
                                </tr>
                                {this.state.offers === undefined ? <tr></tr> : this.state.offers.map((item, index) => (
                                    <tr key={index} style={!item.enable ?
                                        { cursor: "pointer", backgroundColor: "#D3D3D3" } : { cursor: "pointer", backgroundColor: "white" }}
                                    onClick={() => { this.redirectToOffer(item.id); }}>
                                        <td>{item.id}</td>
                                        <td>{this.state.offersTitles.find(element => element.id === item.title_l10n_key).data}</td>
                                        <td>{item.priority}</td>
                                        <td>{this.state.offersPrices.find(element => element.id === item.cost_old).tier}</td>
                                        <td>{this.state.offersPrices.find(element => element.id === item.cost_old).comment}</td>
                                        <td>{this.state.offersPrices.find(element => element.id === item.cost_new).tier}</td>
                                        <td>{this.state.offersPrices.find(element => element.id === item.cost_new).comment}</td>
                                        <td>{moment(item.start_time).format("YYYY-MM-DD HH:mm")}</td>
                                        <td>{timeFormat(item)}</td>
                                        <td>{getExpireDate(item)}</td>
                                        <td>{item.enable ? "true" : "false"}</td>
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

export default OfferssPage;
