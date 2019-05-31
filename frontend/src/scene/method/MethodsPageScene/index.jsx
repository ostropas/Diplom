import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import methodsApi from "../../../api/methods";

let Nickname = "";
class MethodsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            methods: [{
                id:-1,
                title:"",
                description:""
            }]
        };
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
        }
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToPlayer(id) {
        window.location.href = "/method/" + id;
    }

    search() {
        if (Nickname.value === "") {
            return;
        }
        methodsApi.searchMethod(Nickname.value).then((response) => {            
            this.setState({
                methods: response.data
            });
        });
    }


    render() {
        console.log(this.state.methods);
        
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>Поиск по методам</h4></div>
                    <div className="row">
                                <div className="col-12">
                                    <input className="form-control" type="text" name="nickname"
                                        id="search-nickname" ref={(input) => { Nickname = input; }}
                                        onKeyDown={(e) => { if (e.keyCode === 13) this.search(); }}></input>
                                </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Название метода</th>
                                    <th>Описание</th>
                                </tr>
                                {this.state.methods.map((item, index) => (
                                    // eslint-disable-next-line no-underscore-dangle
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => { this.redirectToPlayer(item.id); }}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default MethodsPage;
