import React, { Component } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/user";
import Cookies from 'universal-cookie';
import "../../style/bootstrap/bootstrap.min.css";
import "../../style/base/menu.scss";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      role: ""
    };
  }

  componentDidMount() {
    userApi.getNickname().then(response => {
      if (response.status === 200) {
        let currentRole = "юзер";
        switch (response.data.role) {
          case 1:
            currentRole = "Админ";
            break;
          case 2:
            currentRole = "Эксперт";
            break;
          case 3:
            currentRole = "Юзер";
            break;
            default:
              break;
        }

        const cookies = new Cookies();
        cookies.set('userRole', response.data.role);
        
        this.setState({
          username: response.data.username,
          role: currentRole
        });
      }
    });
  }

  static logOut() {
    localStorage.removeItem("authToken");
    window.location.href = "/auth/login";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Конструкторские приемы
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {this.state.username === "" ? (
            <div className="navbar-nav mr-auto menu" />
          ) : (
            <ul className="navbar-nav mr-auto menu">
              <li className="nav-item">
                <Link to="/methods" className="nav-link">
                  Поиск по приемам
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/fields" className="nav-link">
                  Поля конструктивных приемов
                </Link>
              </li>
            </ul>
          )}
          {this.state.username === "" ? (
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link to="/auth/login" className="nav-link">
                  Войти
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link to="/auth/status" className="nav-link">
                  {this.state.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/auth/status" className="nav-link">
                  {this.state.role}
                </Link>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => Menu.logOut()}
                >
                  Выйти
                </div>
              </li>
            </ul>
          )}

          <ul className="navbar-nav justify-content-end" />
        </div>
      </nav>
    );
  }
}

export default Menu;
