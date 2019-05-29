import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import titlesApi from "../../../api/titles";

let values = [];
let submitButton = "";
let titleKey = "";
class NewTitlePage extends Component {
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
        titlesApi.getLanguages().then((response) => {
            this.setState({
                languages: response.data
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    changeTitle() {
        submitButton.innerHTML = "Saving...";

        values.forEach((item) => {
            const localItem = item;
            localItem.data = localItem.data.value;
        });

        const key = titleKey.value;

        titlesApi.addTitles({ values, key }).then((response) => {
            submitButton.innerHTML = "Saved";
            setTimeout(() => {
                window.location.href = "/titles/" + response.data.titleKeyId;
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
                        <h4 id="player_id">New title</h4>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row" key={-1}>
                                <div className="col-6">
                                    <label htmlFor={"titleKey"}>Title key: </label>
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="text" id={"titleKey"}
                                        ref={(input) => { titleKey = input; }} />
                                </div>
                            </div>
                            {values.map((item, index) => <div className="form-row" key={index}>
                                <div className="col-6">
                                    <label htmlFor={"langInput" + index}
                                    >{languages.find(lang => lang.id === item.language).name + ":"}</label>
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
                                        onClick={() => { this.changeTitle(); }} type="submit">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewTitlePage;
