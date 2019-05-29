import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import redStickersApi from "../../../api/redStickers";

let values = [];
let submitButton = "";
class RedStickerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            languages: [],
            key: {}
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
        redStickersApi.redSticker(this.props.match.params.id).then((response) => {
            this.setState({
                values: response.data.values,
                languages: response.data.languages,
                key: response.data.key
            });
        });
    }

    changeRedSticker() {
        submitButton.innerHTML = "Saving...";

        values.forEach((item) => {
            const localItem = item;
            localItem.data = localItem.data.value;
        });

        redStickersApi.updateRedStickers(values).then(() => {
            submitButton.innerHTML = "Saved";
            setTimeout(() => {
                this.setState({
                    values
                });
                submitButton.innerHTML = "Submit changes";
            }, 300);
        });
    }

    render() {
        const { languages, key } = this.state;
        if (languages.length === 0) { return (<div></div>); }


        values = this.state.values.slice();
        while (values.length < languages.length) {
            values.push({
                data: "", language: values.length + 1, key: key.id, new: true
            });
        }

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
                        <h4 id="player_id">{key.data}</h4>
                    </div>
                    <div className="row">
                        <div>
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
                                    <button className="btn btn-primary" ref={(input) => { submitButton = input; }}
                                        onClick={() => { this.changeRedSticker(); }} type="submit">Submit changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default RedStickerPage;
