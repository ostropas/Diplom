import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
import pricesApi from "../../../api/prices";

class PricesPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: [],
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
        pricesApi.prices(0).then((response) => {
            this.setState({
                pages: response.data.pages,
                prices: response.data.offerPrices === undefined ? [] : response.data.offerPrices
            });
        });
    }

    static redirectToPrice(id) {
        window.location.href = "/prices/" + id;
    }

    setPage(page) {
        pricesApi.prices(page).then((response) => {
            this.setState({
                pages: response.data.pages,
                page,
                prices: response.data.offerPrices === undefined ? [] : response.data.offerPrices
            });
        });
    }

    render() {
        const { prices } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>All prices</h4></div>
                    <div className="row">
                        <div className="form-row">
                            <button className="btn btn-primary"
                                onClick={() => { window.location.href = "prices/new"; }}>Create new price</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Tier</th>
                                    <th>Comment</th>
                                </tr>
                                {prices.length === 0 ? <tr/> : prices.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => PricesPageScene.redirectToPrice(item.id)}>
                                        <td>{item.tier}</td>
                                        <td>{item.comment}</td>
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

export default PricesPageScene;
