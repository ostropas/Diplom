import { api } from "../App";

export default {
    getOneMethod (id) {
        return api.get("/method/" + id);
    },
    searchMethod(searchString) {
        return api.post("/method/find", {searchString: searchString});
    },
    addMethod(method) {
        return api.post("/method/add", {method: method});
    },
    delMethod(id) {
        return api.delete("/method/" + id);
    },
};
