import React, { Component } from "react";
import { SketchPicker } from "react-color";
import moment from "moment";
import Select from "react-select";
import MainContainer from "../../../containers/layout.jsx";
import offersApi from "../../../api/offers";
import ContentList from "../../../components/newOffer/contentList.jsx";
import ConditionList from "../../../components/newOffer/conditionList.jsx";
// import {DatetimePicker} from "rc-datetime-picker";

class NewOfferPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCosts: [],
            allOfferTypes: [],
            allOfferGroups: [],
            characters: [],
            kindsOfAllSelections: [],
            resources: [],
            content: [],
            conditions: [],
            offer: {},
            offerOptional: {},
            timeDuration: {},
            offerColor: "#fff",
            titleKeys: [],
            redStickerKeys: [],
            icons: [],
            backgrounds: [],
            platforms: [],
            startDate: moment(),
            selectedPlatform: [],
            parentOffer: {}
        };
        this.dateChange = this.dateChange.bind(this);
        this.handleSelectPlatformChange = this.handleSelectPlatformChange.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
        }
    }

    handleChangeComplete(color) {
        this.setState({ offerColor: color.hex });
    }

    componentDidMount() {
        offersApi.newOfferInfo().then((response) => {
            if (this.props.match.params.id !== undefined) {
                offersApi.offer(this.props.match.params.id).then((offerResponse) => {
                    const { offer, offerRewards, offerSelections } = offerResponse.data;
                    const newOffer = {};
                    newOffer.offer_title_l10n_key = offer.title_l10n_key.id.toString(10);
                    newOffer.offer_offer_type = offer.offer_type.id.toString(10);
                    newOffer.offer_offer_group = offer.offer_group.id.toString(10);
                    newOffer.offer_cost_old = offer.cost_old.id.toString(10);
                    newOffer.offer_cost_new = offer.cost_new.id.toString(10);
                    newOffer.offer_percent = offer.percent.toString(10);
                    newOffer.offer_enable = offer.enable ? "true" : "false";
                    newOffer.offer_character = offer.character.id.toString(10);
                    newOffer.offer_background = offer.background;
                    newOffer.offer_start_time = moment(offer.start_time).format("YYYY-MM-DDTHH:mm");
                    newOffer.offer_show_timer = offer.show_timer ? "true" : "false";
                    newOffer.offer_red_sticker_key = offer.red_sticker_key.id.toString(10);
                    newOffer.offer_offer_icon_id = offer.offer_icon_id;
                    newOffer.offer_icon_text = offer.icon_text;
                    newOffer.offer_priority = offer.priority.toString(10);
                    newOffer.offer_show_on_hud = offer.show_on_hud ? "true" : "false";

                    const newSelectedPlatform = [];
                    offer.platforms.forEach((element) => {
                        newSelectedPlatform.push({ value: element.platform, label: element.tier_prefix });
                    });

                    const newTimeDuration = {};

                    if (offer.time_duration.years !== undefined) {
                        newTimeDuration.offer_time_duration_year = offer.time_duration.years.toString(10);
                    }

                    if (offer.time_duration.months !== undefined) {
                        newTimeDuration.offer_time_duration_months = offer.time_duration.months.toString(10);
                    }

                    if (offer.time_duration.days !== undefined) {
                        newTimeDuration.offer_time_duration_days = offer.time_duration.days.toString(10);
                    }

                    if (offer.time_duration.hours !== undefined) {
                        newTimeDuration.offer_time_duration_hours = offer.time_duration.hours.toString(10);
                    }

                    if (offer.time_duration.minutes !== undefined) {
                        newTimeDuration.offer_time_duration_minutes = offer.time_duration.minutes.toString(10);
                    }

                    const newContent = [];
                    newContent.push({ contentCount: 0, contentValue: 0, contentTypeValue: 0 });
                    offerRewards.forEach((element) => {
                        let type = 1;
                        switch (element.type) {
                            case "resource":
                                type = 1;
                                break;
                            case "decoration":
                                type = 4;
                                break;
                            default:
                                break;
                        }
                        newContent.push({
                            contentCount: element.count,
                            contentValue: parseInt(element.element, 10),
                            contentTypeValue: type
                        });
                    });

                    const newConditions = [];
                    newConditions.push({ kindOfferSelection: 0, maxValue: 0, minValue: 0 });
                    offerSelections.forEach((element) => {
                        newConditions.push({
                            kindOfferSelection: element.offer_selection_kind.id,
                            maxValue: parseInt(element.max, 10),
                            minValue: parseInt(element.min, 10)
                        });
                    });

                    this.setState({
                        allCosts: response.data.allCosts,
                        allOfferTypes: response.data.allOfferTypes,
                        allOfferGroups: response.data.allOfferGroups,
                        characters: response.data.characters,
                        kindsOfAllSelections: response.data.kindsOfAllSelections,
                        resources: response.data.resources,
                        titleKeys: response.data.titleKeys,
                        redStickerKeys: response.data.redStickerKeys,
                        icons: response.data.icons,
                        backgrounds: response.data.backgrounds,
                        platforms: response.data.platforms,
                        offer: newOffer,
                        parentOffer: offerResponse.data,
                        offerColor: offer.offer_background_color,
                        selectedPlatform: newSelectedPlatform,
                        timeDuration: newTimeDuration,
                        content: newContent,
                        conditions: newConditions
                    });
                });
            } else {
                this.setState({
                    allCosts: response.data.allCosts,
                    allOfferTypes: response.data.allOfferTypes,
                    allOfferGroups: response.data.allOfferGroups,
                    characters: response.data.characters,
                    kindsOfAllSelections: response.data.kindsOfAllSelections,
                    resources: response.data.resources,
                    content: [{ contentTypeValue: 0, contentValue: 0, contentCount: 0 }],
                    conditions: [{ kindOfferSelection: 0, minValue: 0, maxValue: 0 }],
                    titleKeys: response.data.titleKeys,
                    redStickerKeys: response.data.redStickerKeys,
                    icons: response.data.icons,
                    backgrounds: response.data.backgrounds,
                    platforms: response.data.platforms
                });
            }
        });
    }

    updateContent(content) {
        this.setState({
            content
        });
    }

    updateConditions(conditions) {
        this.setState({
            conditions
        });
    }

    saveOffer() {
        const localOffer = this.state.offer;
        localOffer.offer_offer_background_color = this.state.offerColor.replace("#", "");
        let request = {};
        request = Object.assign(request, this.state.offer);
        const rewardCount = [];
        const rewardElement = [];
        const rewardType = [];
        const selectionMax = [];
        const selectionMin = [];
        const selectionOfferSelectionKind = [];

        for (let i = 1; i < this.state.content.length; i++) {
            rewardCount.push(this.state.content[i].contentCount.toString());
            rewardElement.push(this.state.content[i].contentValue.toString());
            rewardType.push(this.state.content[i].contentTypeValue.toString());
        }


        for (let j = 1; j < this.state.conditions.length; j++) {
            selectionMax.push(this.state.conditions[j].maxValue.toString().replace(/\D+/g, ""));
            selectionMin.push(this.state.conditions[j].minValue.toString().replace(/\D+/g, ""));
            selectionOfferSelectionKind.push(this.state.conditions[j].kindOfferSelection.toString());
        }

        request = Object.assign(request, { reward_count_0: rewardCount });
        request = Object.assign(request, { reward_element_0: rewardElement });
        request = Object.assign(request, { reward_type_0: rewardType });
        request = Object.assign(request, { selection_max_0: selectionMax });
        request = Object.assign(request, { selection_min_0: selectionMin });
        request = Object.assign(request, { selection_offer_selection_kind_0: selectionOfferSelectionKind });

        request = Object.assign(request, this.state.timeDuration);

        request = Object.assign(request, this.state.offerOptional);

        request.platform_key = [];

        this.state.selectedPlatform.forEach((item) => {
            request.platform_key.push(item.value);
        });

        offersApi.createNewOffer(request).then(() => {
            window.location.href = "/offers";
        });
    }

    saveInput(event) {
        const offerLocal = this.state.offer;
        offerLocal[event.target.id] = event.target.value;
        this.setState({
            offer: offerLocal
        });
    }

    saveTimeDuration(event) {
        const timeDurationLocal = this.state.timeDuration;
        timeDurationLocal[event.target.id] = event.target.value;
        this.setState({
            timeDuration: timeDurationLocal
        });
    }

    handleSelectPlatformChange(selectedOption) {
        this.setState({ selectedPlatform: selectedOption });
    }

    dateChange(date) {
        this.setState({ startDate: date });
    }

    render() {
        const convertedCosts = this.state.allCosts.map(m => ({ id: m.id, title: m.tier + ", comment: " + m.comment, value: m.id }));
        const convertedTitles = this.state.titleKeys.map(m => ({ id: m.id, title: m.data, value: m.id }));
        const convertedRedStickers = this.state.redStickerKeys.map(m => ({ id: m.id, title: m.data, value: m.id }));
        const convetedOfferTypes = this.state.allOfferTypes.map(m => ({ id: m.id, title: m.title, value: m.id }));
        const convetedOfferGroups = this.state.allOfferGroups.map(m => ({ id: m.id, title: m.title, value: m.id }));
        const convetedIcons = this.state.icons.map(m => ({ id: m.id, title: m.data, value: m.data }));
        const iconKeys = [
            {
                id: "Offer_header_1", title: "Offer_header_1", value: "Offer_header_1"
            },
            {
                id: "Offer_header_2", title: "Offer_header_2", value: "Offer_header_2"
            },
            {
                id: "Offer_header_3", title: "Offer_header_3", value: "Offer_header_3"
            },
            {
                id: "Offer_header_4", title: "Offer_header_4", value: "Offer_header_4"
            },
            {
                id: "Offer_header_5", title: "Offer_header_5", value: "Offer_header_5"
            },
            {
                id: "Offer_header_6", title: "Offer_header_6", value: "Offer_header_6"
            }
        ];
        const convetedBackgrounds = this.state.backgrounds.map(m => ({ id: m.id, title: m.data, value: m.data }));
        const convetedPlatforms = this.state.platforms.map(m => ({ value: m.platform, label: m.tier_prefix }));

        const booleanSelect = [
            { id: "t", value: true, title: "true" },
            { id: "f", value: false, title: "false" }
        ];
        const formatedCharacters = this.state.characters.map(m => ({ id: m.id, value: m.id, title: m.name }));
        const nameRegex = /^Name_(.*)$/;
        for (let i = 0; i < formatedCharacters.length; i += 1) {
            const r = nameRegex.exec(formatedCharacters[i].title);
            formatedCharacters[i].title = r[1].replace(/_/g, " ");
        }

        const offerParamDict = [
            {
                key: "offer_title_l10n_key", title: "Title", type: "select", value: convertedTitles
            },
            {
                key: "offer_offer_type", title: "offer type", type: "select", value: convetedOfferTypes
            },
            {
                key: "offer_offer_group", title: "offer group", type: "select", value: convetedOfferGroups
            },
            {
                key: "offer_cost_old", title: "Old price", type: "select", value: convertedCosts
            },
            {
                key: "offer_cost_new", title: "New price", type: "select", value: convertedCosts
            },
            {
                key: "offer_percent", title: "discount percentage", type: "number", value: ""
            },
            {
                key: "offer_enable", title: "Is available", type: "select", value: booleanSelect
            },
            {
                key: "offer_character", title: "Character", type: "select", value: formatedCharacters
            },
            {
                key: "offer_background", title: "Background(id)", type: "select", value: convetedBackgrounds
            },
            {
                key: "offer_start_time", title: "Start time", type: "datetime-local", value: ""
            },
            {
                key: "offer_show_timer", title: "show timer", type: "select", value: booleanSelect
            },
            {
                key: "offer_red_sticker_key", title: "red sticker", type: "select", value: convertedRedStickers
            },
            {
                key: "offer_offer_background_color", title: "offer background color", type: "SketchPicker", value: ""
            },
            {
                key: "offer_offer_icon_id", title: "offer icon id", type: "select", value: convetedIcons
            },
            {
                key: "offer_icon_text", title: "offer icon key", type: "select", value: iconKeys
            },
            {
                key: "offer_priority", title: "priority", type: "number", value: ""
            },
            {
                key: "offer_show_on_hud", title: "show on hud", type: "select", value: booleanSelect
            },
            {
                key: "offer_platform_key", title: "target platfrom", type: "reactMultiSelect", value: convetedPlatforms
            }
        ];

        const offerTimeDuration = [
            {
                key: "offer_time_duration_year",
                title: "Time duration, years",
                type: "text",
                value: this.state.timeDuration.offer_time_duration_year,
                placeholder: "year"
            },
            {
                key: "offer_time_duration_months",
                title: "Time duration, months",
                type: "text",
                value: this.state.timeDuration.offer_time_duration_months,
                placeholder: "months"
            },
            {
                key: "offer_time_duration_days",
                title: "Time duration, days",
                type: "text",
                value: this.state.timeDuration.offer_time_duration_days,
                placeholder: "days"
            },
            {
                key: "offer_time_duration_hours",
                title: "Time duration,hours",
                type: "text",
                value: this.state.timeDuration.offer_time_duration_hours,
                placeholder: "hours"
            },
            {
                key: "offer_time_duration_minutes",
                title: "Time duration,minutes",
                type: "text",
                value: this.state.timeDuration.offer_time_duration_minutes,
                placeholder: "minutes"
            }
        ];

        const offerOptionalParams = [
            {
                key: "optional_max_group_purchases", title: "Max group purchases", type: "select", value: convetedOfferGroups
            }
        ];

        // eslint-disable-next-line func-names
        let offerField = function (item, index, save = undefined) {
            switch (item.type) {
                case "SketchPicker":
                    return (
                        <div className="form-row" key={index}>
                            <div className="col-2"><label htmlFor={item.key}>{item.title}</label></div>
                            <div className="col-4">
                                <SketchPicker
                                    color={ this.state.offerColor }
                                    onChangeComplete={ this.handleChangeComplete.bind(this) }
                                    width={150}
                                    presetColors={[]}
                                    disableAlpha={true}
                                />
                            </div>
                        </div>);
                case "reactMultiSelect":
                    return (
                        <div className="form-row" key={index}>
                            <div className="col-2"><label htmlFor={item.key}>{item.title}</label></div>
                            <div className="col-4">
                                <Select
                                    value={this.state.selectedPlatform}
                                    onChange={this.handleSelectPlatformChange}
                                    options={item.value}
                                    isMulti
                                />
                            </div>
                        </div>);

                default:
                    return (<div className="form-row" key={index}>
                        <div className="col-2"><label htmlFor={item.key}>{item.title}</label></div>
                        <div className="col-4">
                            {item.type === "select" ?
                                <select className="custom-select" name={item.key} value={this.state.offer[item.key]} id={item.key}
                                    onChange={save === undefined ? this.saveInput.bind(this) : save.bind(this)}>
                                    <option>Select value</option>
                                    {item.value.map(i => (
                                        <option value={item.key === "offer_cost_old" || item.key === "offer_cost_new" ? i.id : i.value}
                                            key={i.id} id={i.id}>{i.title}</option>
                                    ))}
                                </select>
                                // eslint-disable-next-line operator-linebreak
                                :
                                <input className="form-control" type={item.type}
                                    value={this.state.offer[item.key] === undefined ? "" : this.state.offer[item.key]}
                                    onChange={(e) => {
                                        const tmpOffer = this.state.offer;
                                        tmpOffer[item.key] = e.target.value;
                                        this.setState({ offer: tmpOffer });
                                    }}
                                    name={item.key} id={item.key}
                                    onBlur={this.saveInput.bind(this)}/>}

                        </div>
                        <div className="col-6"></div>
                    </div>);
            }
        };
        offerField = offerField.bind(this);

        let checkParams = () => {
            const { offer } = this.state;
            // offer check
            const offerCheck = (offer.offer_background !== undefined && offer.offer_background !== "Select value") &&
            (offer.offer_character !== undefined && offer.offer_character !== "Select value") &&
            (offer.offer_cost_new !== undefined && offer.offer_cost_new !== "Select value") &&
            (offer.offer_cost_old !== undefined && offer.offer_cost_old !== "Select value") &&
            (offer.offer_enable !== undefined && offer.offer_enable !== "Select value") &&
            (offer.offer_offer_icon_id !== undefined && offer.offer_offer_icon_id !== "Select value") &&
            (offer.offer_offer_icon_id !== undefined && offer.offer_offer_icon_id !== "Select value") &&
            (offer.offer_percent !== undefined && offer.offer_percent !== "") &&
            (offer.offer_priority !== undefined && offer.offer_priority !== "") &&
            (offer.offer_red_sticker_key !== undefined && offer.offer_red_sticker_key !== "Select value") &&
            (offer.offer_show_on_hud !== undefined && offer.offer_show_on_hud !== "Select value") &&
            (offer.offer_show_timer !== undefined && offer.offer_show_timer !== "Select value") &&
            (offer.offer_title_l10n_key !== undefined && offer.offer_title_l10n_key !== "Select value") &&
            (offer.offer_start_time !== "" && offer.offer_start_time !== undefined) &&
            (offer.offer_offer_type !== "Select value" && offer.offer_offer_type !== undefined) &&
            (offer.offer_offer_group !== "Select value" && offer.offer_offer_group !== undefined);

            const platformCheck = this.state.selectedPlatform.length !== 0;

            const contentCheck = this.state.content.length !== 1 &&
                this.state.content.slice(1).every(element => element.contentTypeValue !== 0 && element.contentCount !== 0);
            const conditionsCheck = this.state.conditions.length !== 1 &&
                this.state.conditions.slice(1).every(element => element.kindOfferSelection !== 0);

            return {
                offerCheck,
                platformCheck,
                contentCheck,
                conditionsCheck
            };
        };
        checkParams = checkParams.bind(this);

        function offerCanBeAdded() {
            const params = checkParams();

            return params.offerCheck && params.platformCheck && params.contentCheck && params.conditionsCheck;
        }

        function alertEmptyParams() {
            const params = checkParams();

            let alertString = "Offer have some problems:\n";

            if (!params.offerCheck) {
                alertString += "blank fields in the offer\n";
            }

            if (!params.platformCheck) {
                alertString += "chose platforms\n";
            }

            if (!params.contentCheck) {
                alertString += "chose content\n";
            }

            if (!params.conditionsCheck) {
                alertString += "chose conditions\n";
            }

            alert(alertString);
        }
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4 id="player_id">Create new offer</h4>
                    </div>
                    <div className="row">
                        <div>
                            {offerParamDict.map((item, index) => (
                                offerField(item, index)
                            ))}

                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="time_duration_id">Time duration</label>
                                </div>
                                <div className="col-6">
                                    <div id="time_duration_id" className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            {offerTimeDuration.map(p => (
                                                <input key={p.key} className="form-control" value={p.value ? p.value : ""}
                                                    onChange={this.saveTimeDuration.bind(this)}
                                                    placeholder={p.placeholder} type={p.type} name={p.key} id={p.key}></input>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ContentList
                                content={this.state.content}
                                resources={this.state.resources}
                                updateContent={this.updateContent.bind(this)}
                            />

                            <ConditionList
                                conditions={this.state.conditions}
                                allCosts={this.state.allCosts}
                                kindsOfAllSelections={this.state.kindsOfAllSelections}
                                updateConditions={this.updateConditions.bind(this)}
                            />

                            <div>
                                <div className="row justify-content-md-center">
                                    <h5 className="mt-5">Optional parmetrs</h5>
                                </div>

                                <div>
                                    {offerOptionalParams.map((item, index) => (
                                        offerField(item, index, (event) => {
                                            const offerOptionalLocal = this.state.offerOptional;
                                            offerOptionalLocal[event.target.id] = event.target.value;
                                            this.setState({
                                                offerOptional: offerOptionalLocal
                                            });
                                        })
                                    ))}
                                </div>
                            </div>

                            {/* <DatetimePicker
                                // moment={this.state.startDate}
                                // onChange={this.handleChange}
                            /> */}


                            <div className="form-row">
                                {
                                    offerCanBeAdded() === true ?
                                        <button className="btn btn-primary offset-md-11" type="submit"
                                            onClick={() => this.saveOffer()} >Submit</button> :
                                        <button className="btn btn-primary offset-md-11" type="submit"
                                            onClick={alertEmptyParams} >Submit</button>
                                }

                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewOfferPageScene;
