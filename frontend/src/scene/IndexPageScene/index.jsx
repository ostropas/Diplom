import React, { Component } from "react";
import MainContainer from "../../containers/layout.jsx";
import "../../style/indexPage/_indexPage.scss";

class IndexPage extends Component {
  render() {
    return (
      <MainContainer>
        <div className="container">
          <div className="row justify-content-md-center">
            <h4>Конструктивные приемы</h4>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default IndexPage;
