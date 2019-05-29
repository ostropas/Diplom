import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import pricesApi from "../../../api/prices";

class PricePageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: {}
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
        pricesApi.price(this.props.match.params.id).then((response) => {
            this.setState({
                price: response.data
            });
        });
    }

    render() {
        const { price } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4 id="player_id">{"Offer price " + price.id}</h4>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>tier</label>
                        </div>
                        <div className="col-6">
                            <label>{price.tier}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>comment</label>
                        </div>
                        <div className="col-6">
                            <label>{price.comment}</label>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default PricePageScene;
