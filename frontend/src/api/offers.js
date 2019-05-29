import { api } from "../App";

export default {
    offers(params) {
        return api.post("/offers", params);
    },
    offer(id) {
        return api.get(`/offers/${id}`);
    },
    newOfferInfo() {
        return api.get("/offers/new");
    },
    createNewOffer(params) {
        return api.put("/offers/new", params);
    },
    sendOfferToArchive(id) {
        return api.put(`/offers/archive/${id}`);
    }
};
