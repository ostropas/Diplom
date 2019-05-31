import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import additionalFieldsApi from "../../../api/additionalFileds";
import methodsApi from "../../../api/methods";

class NewMethodPageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: {
        title: "",
        description: "",
        additionalInfo: new Map()
      },
      allFields: []
    };
  }

  componentDidMount() {
    additionalFieldsApi.getAllTypes().then(response => {
      this.setState({
        allFields: response.data
      });
    });
  }

  createNewMethod() {
    const methodLocal = this.state.method;
    methodLocal.additionalInfo = Array.from(methodLocal.additionalInfo).map(
      val => {
        return { typeid: val[0], data: val[1] };
      }
    );

    methodsApi.addMethod(this.state.method).then(response => {
      window.location.href = "/methods/" + response.data;
    });
  }

  saveInput(event) {
    const methodLocal = this.state.method;
    methodLocal[event.target.id] = event.target.value;
    this.setState({
      method: methodLocal
    });
  }

  saveAdditionalInput(event) {
    if (event.target.value === "") {
      return;
    }
    const methodLocal = this.state.method;
    methodLocal.additionalInfo.set(event.target.id, event.target.value);
    this.setState({
      method: methodLocal
    });
  }

  render() {
    return (
      <MainContainer>
        <div className="container">
          <div className="row justify-content-md-center">
            <h4 id="player_id">Создать новый метод</h4>
          </div>
          <div className="row">
            <div className="col-2">
              <label htmlFor="title">Название:</label>
            </div>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                id="title"
                onBlur={this.saveInput.bind(this)}
              />
            </div>
            <div className="col-2">
              <label htmlFor="description">Описание:</label>
            </div>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                id="description"
                onBlur={this.saveInput.bind(this)}
              />
            </div>
            <div className="col-12">
              {this.state.allFields.map((element, index) => (
                <div className="row" key={index}>
                  <div className="col-2">
                    <label htmlFor="description">{element.title + ":"}</label>
                  </div>
                  <div className="col-10">
                    <input
                      className="form-control"
                      type="text"
                      id={element.id}
                      onBlur={this.saveAdditionalInput.bind(this)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <br />
              <div className="form-row">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.createNewMethod();
                  }}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default NewMethodPageScene;
