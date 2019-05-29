import { api } from "../App";

export default {
    prices(page) {
        return api.get("/prices", { params: { p: page } });
    },
    price(id) {
        return api.get(`/prices/${id}`);
    },
    addPrice(params) {
        return api.put("/prices/add", params);
    }
};
