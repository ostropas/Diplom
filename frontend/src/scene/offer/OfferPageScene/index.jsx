import React, { Component } from "react";
import moment from "moment";
import MainContainer from "../../../containers/layout.jsx";
import offersApi from "../../../api/offers";

class OfferPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: {},
            offerRewards: [],
            offerSelections: [],
            offerOptionals: {}
        };
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            // eslint-disable-next-line no-alert
            alert("You aren't authificated");
            window.location.href = "/auth/login";
        }
    }

    componentDidMount() {
        offersApi.offer(this.props.match.params.id).then((response) => {
            this.setState({
                offer: response.data.offer,
                offerRewards: response.data.offerRewards,
                offerSelections: response.data.offerSelections,
                offerOptional: response.data.offerOptional
            });
        });
    }

    sendOfferToArchive() {
        offersApi.sendOfferToArchive(this.props.match.params.id);
        const { offer } = this.state;
        offer.enable = false;
        this.setState({
            offer
        });
    }

    createDuplicate() {
        window.location.href = "/offers/new/" + this.props.match.params.id;
    }

    render() {
        const nameRegex = /^Name_(.*)$/;
        const { offer, offerRewards, offerSelections } = this.state;

        function timeFormat(_offer) {
            let formatTimeDuration = "";
            if (_offer.time_duration) {
                formatTimeDuration = Object.keys(_offer.time_duration).reduce((acc, curr) => {
                    let tmpAcc = acc;
                    tmpAcc += `${curr} ${_offer.time_duration[curr]} `;
                    return tmpAcc;
                }, "");
            }

            return formatTimeDuration;
        }

        // render empty, if offer not download
        if (offer.id === undefined) {
            return (<div/>);
        }

        const convertedPlatforms = this.state.offer.platforms.map(m => m.tier_prefix);

        const offerParams = [
            { title: "title", value: offer.title_l10n_key.data },
            { title: "offer type", value: offer.offer_type.title },
            { title: "offer group", value: offer.offer_group.title },
            { title: "old price", value: offer.cost_old.tier + " comment: " + offer.cost_old.comment },
            { title: "new price", value: offer.cost_new.tier + " comment: " + offer.cost_new.comment },
            { title: "discount percentage", value: offer.percent },
            { title: "is available", value: offer.enable ? "true" : "false" },
            { title: "character", value: nameRegex.exec(offer.character.name)[1].replace("_", " ") },
            { title: "background(id)", value: offer.background },
            { title: "start time (utc)", value: moment(offer.start_time).format("YYYY-MM-DD HH:mm") },
            { title: "time duration", value: timeFormat(offer) },
            { title: "red sticker", value: offer.red_sticker_key.data },
            { title: "offer background color", value: offer.offer_background_color },
            { title: "offer icon id", value: offer.offer_icon_id },
            { title: "offer icon key", value: offer.icon_text },
            { title: "priority", value: offer.priority },
            { title: "show on hud", value: offer.show_on_hud ? "true" : "false" },
            { title: "show timer", value: offer.show_timer ? "true" : "false" },
            { title: "platforms", value: convertedPlatforms.join(", ") }
        ];

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4 className="mt-3">{"Offer " + offer.id}</h4>
                    </div>
                    {offerParams.map((item, index) => (
                        <div className="row" key={index}>
                            <div className="col-6">
                                <label>{item.title}</label>
                            </div>
                            <div className="col-6">
                                <label>{item.value}</label>
                            </div>
                        </div>
                    ))}

                    <div className="row justify-content-md-center">
                        <h5 className="mt-5">Content</h5>
                    </div>
                    <div className="form-row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Element</th>
                                    <th scope="col">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offerRewards.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <label>
                                                {item.type}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {item.name}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {item.count}
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row justify-content-md-center">
                        <h5 className="mt-5">Conditions</h5>
                    </div>
                    <div className="form-row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Kind of offer selection</th>
                                    <th scope="col">Minimum value</th>
                                    <th scope="col">Maximim value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offerSelections.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <label>
                                                {item.offer_selection_kind.title}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {Math.floor(parseFloat(item.min))}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {Math.floor(parseFloat(item.max))}
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {this.state.offerOptional === undefined ? <div></div> :
                        <div>
                            <div className="row justify-content-md-center">
                                <h5 className="mt-5">Optional</h5>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Max group purchases</label>
                                </div>
                                <div className="col-6">
                                    <label>{this.state.offerOptional.offer_group.title}</label>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="col-12" style={{ marginBottom: "60px" }}>
                        {this.state.offer.enable ? <button style={{ float: "right" }} className="btn btn-warning"
                            onClick={() => this.sendOfferToArchive()}>Send offer to archvie</button> :
                            <button style={{ float: "right" }} className="btn btn-warning" disabled>Offer in archive</button>}
                        <button style={{ float: "right", marginRight: "30px" }} className="btn btn-primary"
                            onClick={() => this.createDuplicate()}>Create duplicate</button>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default OfferPage;
