import { api } from "../App";

export default {
    icons(params) {
        return api.post("/icons", params);
    },
    icon(id) {
        return api.get(`/icons/${id}`);
    },
    addIcon(params) {
        return api.put("/icons/add", params);
    }
};
