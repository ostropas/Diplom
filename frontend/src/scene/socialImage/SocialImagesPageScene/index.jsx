import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import Pagination from "../../../components/base/Pagination.jsx";
// eslint-disable-next-line import/extensions
import imagesApi from "../../../api/socialImages.js";

class SocialImagesPageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            page: 0,
            pages: 1
        };
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
        }
    }

    componentDidMount() {
        imagesApi.images({ p: this.state.page }).then((response) => {
            this.setState({
                pages: response.data.pages,
                images: response.data.images === undefined ? [] : response.data.images
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToImages(id) {
        window.location.href = "/socialImages/" + id;
    }

    search() {
        imagesApi.images({ p: 0 }).then((response) => {
            this.setState({
                images: response.data.images === undefined ? [] : response.data.images,
                pages: response.data.pages,
                page: 0
            });
        });
    }

    setPage(page) {
        imagesApi.images({ p: page }).then((response) => {
            this.setState({
                pages: response.data.pages,
                page,
                images: response.data.images === undefined ? [] : response.data.images
            });
        });
    }

    render() {
        const { images } = this.state;

        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>All images</h4></div>
                    <div className="row">
                        <div className="form-row">
                            <button className="btn btn-primary"
                                onClick={() => { window.location.href = "socialImages/new"; }}>Create new image</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Url</th>
                                    <th>Image</th>
                                </tr>
                                {images.length === 0 ? <tr></tr> : images.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => this.redirectToImages(item.id)}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td><img src={item.url} alt="img" height="50" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        page={this.state.page}
                        pages={this.state.pages}
                        setPage={this.setPage.bind(this)}
                    />
                </div>
            </MainContainer>
        );
    }
}

export default SocialImagesPageScene;
