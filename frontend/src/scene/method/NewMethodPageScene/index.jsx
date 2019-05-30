import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import pricesApi from "../../../api/prices";

let comment = 0;
let tier = "";
class NewMethodPageScene extends Component {
    // eslint-disable-next-line class-methods-use-this
    createNewPrice() {
        pricesApi.addPrice({ comment: comment.value, tier: tier.value }).then((response) => {
            window.location.href = "/prices/" + response.data.id;
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4 id="player_id">Create new price</h4>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="tierid">Tier</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="tier" id="tierid"
                                        ref={(input) => { tier = input; }}/>
                                </div>
                                <div className="col-6">
                                    <label>e.g.: t02_special_offer</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="commentid">Comment</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="comment" id="commentid"
                                        ref={(input) => { comment = input; }}/>
                                </div>
                                {/* <div className="col-6">
                                <label>e.g.: 10.99</label>
                            </div> */}
                            </div>
                            <div className="form-row">
                                <button className="btn btn-primary" onClick={() => { this.createNewPrice(); }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewMethodPageScene;
