import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://ttp.morkwa.com:8071" : "http://localhost:8000";
// const BASE_URL = "https://ttp.morkwa.com:8071";

// eslint-disable-next-line import/prefer-default-export
export const configureApi = () => {
    let authToken = "";
    if (localStorage.getItem("authToken") !== null) {
        authToken = localStorage.getItem("authToken");
    }

    const instance = axios.create({
        baseURL: BASE_URL + "/api",
        headers: {
            "x-access-token": authToken
        }
    });

    instance.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        console.log(error);

        return Promise.reject(error);
    });

    instance.interceptors.response.use((response) => {

        return response;
    }, (error) => {
        if (error && error.response && error.response.status) {
            if (error.response.status === 400) {
                console.log("error", error);
            }
        }

        return Promise.reject(error);
    });

    return instance;
};
