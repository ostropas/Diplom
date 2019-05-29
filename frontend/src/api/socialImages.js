import { api } from "../App";

export default {
    images(params) {
        return api.post("/social_images", params);
    },
    image(id) {
        return api.get(`/social_images/${id}`);
    },
    addImage(params) {
        return api.put("/social_images/add", params);
    }
};
