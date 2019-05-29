import { api } from "../App";

export default {
    titles(params) {
        return api.post("/titles", params);
    },
    title(id) {
        return api.get(`/titles/${id}`);
    },
    updateTitles(params) {
        return api.put("/titles/update", params);
    },
    getLanguages() {
        return api.get("/titles/languages");
    },
    newTitleKey(titleKey) {
        return api.put("/title/addKey", titleKey);
    },
    addTitles(params) {
        return api.put("/titles/addTitles", params);
    }
};
