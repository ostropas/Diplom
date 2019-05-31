import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "../components/base/Menu";
import "../style/layout/index.scss";
import UserApi from "../api/user";

export default class MainLayout extends Component {
  componentWillMount() {
    if (localStorage.getItem("authToken") !== null) {
      UserApi.getNickname()
        .then(response => {
          if (response.status === 500) {
            localStorage.removeItem("authToken");
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          alert("You aren't authenticated");
          window.location.href = "/auth/login";
        });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Menu />
        <section className="page-content" id="page-content">
          {children}
        </section>
      </div>
    );
  }
}

MainLayout.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.node
};
