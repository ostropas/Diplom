import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import additionalFieldsApi from "../../../api/additionalFileds";

let data = 0;
class NewFieldPage extends Component {
  CreateNewField() {
    additionalFieldsApi.addType(data.value).then(() => {
      window.location.href = "/fields";
    });
  }

  render() {
    return (
      <MainContainer>
        <div className="container">
          <div className="row justify-content-md-center">
            <h4>Создать новое поле</h4>
          </div>
          <div className="row">
            <div>
              <div className="form-row">
                <div className="col-4">
                  <label htmlFor="data">Название</label>
                </div>
                <div className="col-8">
                  <input
                    className="form-control"
                    type="text"
                    name="tier"
                    id="data"
                    ref={input => {
                      data = input;
                    }}
                  />
                </div>
              </div>
              <div className="form-row">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.CreateNewField();
                  }}
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default NewFieldPage;
