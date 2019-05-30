import { api } from "../App";

export default {
    getAllTypes () {
        return api.get("/additionalInfoTypes");
    },
    addType(title) {
        return api.post("/additionalInfoTypes/add", {title: title});
    }
};
