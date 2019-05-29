import { api } from "../App";

export default {
    register(params) {
        return api.post("/register", params);
    },
    login(params) {
        return api.post("/login", params);
    }
};
