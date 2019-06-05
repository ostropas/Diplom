import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import methodsApi from "../../../api/methods";
import Cookies from 'universal-cookie';

var isDeleting = false;
class MethodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: {
        additionalInfo: []
      },
      userRole: 3
    };
  }

  componentWillMount() {
    if (localStorage.getItem("authToken") === null) {
      alert("You aren't authenticated");
      window.location.href = "/auth/login";
    }
  }

  componentDidMount() {
    const cookies = new Cookies();
    methodsApi.getOneMethod(this.props.match.params.id).then(response => {
      this.setState({
        method: response.data,
        userRole: Number(cookies.get('userRole'))
      });
    });
  }

  deleteMethod() {
    if (isDeleting) {
      return;
    }
    isDeleting = true;
    if (window.confirm("Вы действительно хотите удалить метод?")) {
      methodsApi.delMethod(this.props.match.params.id).then(() => {
        window.location.href = "/methods";
      });
    }
  }

  render() {
    return (
      <MainContainer>
        <div className="container">
          <div className="row justify-content-md-center mt-3">
            <h4>Описание метода</h4>
          </div>
          <div className="row">
            <div className="col-2">
              <label>Название:</label>
            </div>
            <div className="col-10">
              <label>{this.state.method.title}</label>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>Описание:</label>
            </div>
            <div className="col-10">
              <p>{this.state.method.description}</p>
            </div>
          </div>
          {this.state.method.additionalInfo.map((item, index) => (
            <div key={index} className="row">
              <div className="col-2">
                <label>{item.type + ":"}</label>
              </div>
              <div className="col-10">
                <label>{item.data}</label>
              </div>
            </div>
          ))}
          <br />
          {this.state.userRole === 1 ? (
            <div className="col-12">
            <input
              className="btn btn-danger"
              onClick={() => {
                this.deleteMethod();
              }}
              type="button"
              value="Удалить метод"
            />
          </div>
          ): (<div></div>)}
          
        </div>
      </MainContainer>
    );
  }
}

export default MethodPage;
