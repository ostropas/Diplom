import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import redStickersApi from "../../../api/redStickers";

let values = [];
let submitButton = "";
let redStickerKey = "";
class NewRedStickerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            languages: []
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
        redStickersApi.getLanguages().then((response) => {
            this.setState({
                languages: response.data
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    changeRedSticker() {
        submitButton.innerHTML = "Saving...";

        values.forEach((item) => {
            const localItem = item;
            localItem.data = localItem.data.value;
        });

        const key = redStickerKey.value;

        redStickersApi.addRedStickers({ values, key }).then((response) => {
            submitButton.innerHTML = "Saved";
            setTimeout(() => {
                window.location.href = "/redStickers/" + response.data.redStickerKeyId;
            }, 300);
        });
    }

    render() {
        const { languages } = this.state;
        if (languages.length === 0) { return (<div></div>); }


        values = this.state.values.slice();
        while (values.length < languages.length) { values.push({ data: "", language: values.length + 1, new: true }); }

        values.sort((l, r) => {
            if (l.language < r.language) {
                return -1;
            }
            if (l.language > r.language) {
                return 1;
            }
            return 0;
        });

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4 id="player_id">New red sticker</h4>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row" key={-1}>
                                <div className="col-6">
                                    <label htmlFor={"redStickerKey"}>Red sticker key: </label>
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="text" id={"redStickerKey"}
                                        ref={(input) => { redStickerKey = input; }} />
                                </div>
                            </div>
                            {values.map((item, index) => <div className="form-row" key={index}>
                                <div className="col-6">
                                    <label htmlFor={"langInput" + index}>
                                        {languages.find(lang => lang.id === item.language).name + ":"}</label>
                                </div>
                                <div className="col-6" key={item.data}>
                                    <input className="form-control" type="text" id={"langInput" + index}
                                        // eslint-disable-next-line no-param-reassign
                                        defaultValue={item.data} ref={(input) => { item.data = input; }} />
                                </div>
                            </div>)}
                            <br />
                            <div className="form-row">
                                <div className="col-6">
                                    <button className="btn btn-primary"
                                        ref={(input) => { submitButton = input; }}
                                        onClick={() => { this.changeRedSticker(); }} type="submit">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewRedStickerPage;
