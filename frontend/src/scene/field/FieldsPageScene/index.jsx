import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import additionalFieldsApi from "../../../api/additionalFileds";

class FieldsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFields: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem("authToken") === null) {
      alert("You aren't authenticated");
      window.location.href = "/auth/login";
    }
  }

  componentDidMount() {
    additionalFieldsApi.getAllTypes().then(response => {
      this.setState({
        allFields: response.data
      });
    });
  }

  render() {
    console.log(this.state.allFields);

    return (
      <MainContainer>
        <div className="container">
          <div className="row justify-content-md-center mt-3">
            <h4>Типы полей методов</h4>
          </div>

          <div className="row mt-4">
            <table className="table">
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Название</th>
                </tr>
                {this.state.allFields.length === 0 ? (
                  <tr />
                ) : (
                  this.state.allFields.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="form-row">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "fields/new";
                }}
              >
                Создать новое поле
              </button>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default FieldsPage;
