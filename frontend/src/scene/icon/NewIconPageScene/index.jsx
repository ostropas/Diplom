import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
// eslint-disable-next-line import/extensions
import iconsApi from "../../../api/icons.js";

let data = 0;
class NewIconPageScene extends Component {
    // eslint-disable-next-line class-methods-use-this
    CreateNewIcon() {
        iconsApi.addIcon({ data: data.value }).then(() =>{
            window.location.href = "/icons";
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h4>Create new icon</h4>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row">
                                <div className="col-2">
                                    <label htmlFor="data">Data</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="tier" id="data"
                                        ref={(input) => { data = input; }}/>
                                </div>
                                <div className="col-6">
                                    <label>e.g.: tf_offer_New_Player_Pack_1</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <button className="btn btn-primary" onClick={()=>{this.CreateNewIcon()}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default NewIconPageScene;
