import React, { Component } from "react";
import MainContainer from "../../containers/layout.jsx";
import authApi from "../../api/auth";

let username = "";
let password = "";
class LoginPage extends Component {
    // eslint-disable-next-line class-methods-use-this
    login() {
        authApi.login({ username: username.value, password: password.value }).then((response) => {
            if (response.data.auth) {
                localStorage.setItem("authToken", response.data.token);
                window.location.href = "/";
            } else {
                alert("Wrong password or username");
            }
        });
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h1>Авторизация</h1>
                    </div>
                    <div className="row">
                        <div>
                            <div className="form-row">
                                <div className="col-6">
                                    <label htmlFor="username">Пользователь:</label>
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="text" id="username"
                                        ref={(input) => { username = input; }}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-6">
                                    <label htmlFor="password">Пароль:</label>
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="password" id="password"
                                        ref={(input) => { password = input; }}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <button className="btn btn-primary" onClick={() => this.login()}>Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default LoginPage;
