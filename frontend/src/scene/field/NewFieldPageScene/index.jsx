import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import additionalFieldsApi from "../../../api/additionalFileds";


let data = "";
let type = 0;
class NewFieldPage extends Component {
  CreateNewField() {
    additionalFieldsApi.addType({data: data, type: type}).then(() => {
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
                    onChange={(e) => {data = e.target.value}}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-4">
                  <label htmlFor="data">Тип</label>
                </div>
                <div className="col-8">
                  <select
                    className="form-control"
                    type="text"
                    name="tier"
                    id="data"
                    onChange = {(e) => {type = e.target.value}}
                  > 
                  <option value="0">Текст</option>
                  <option value="1">Число</option>
                  </select>
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
