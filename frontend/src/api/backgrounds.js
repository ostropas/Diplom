import { api } from "../App";

export default {
    backgrounds(params) {
        return api.post("/backgrounds", params);
    },
    background(id) {
        return api.get(`/backgrounds/${id}`);
    },
    addBackground(params) {
        return api.put("/backgrounds/add", params);
    }
};
