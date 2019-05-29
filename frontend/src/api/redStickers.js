import { api } from "../App";

export default {
    redStickers(params) {
        return api.post("/redStickers", params);
    },
    redSticker(id) {
        return api.get(`/redStickers/${id}`);
    },
    updateRedStickers(params) {
        return api.put("/redStickers/update", params);
    },
    getLanguages() {
        return api.get("/redStickers/languages");
    },
    newRedStickerKey(redStickerKey) {
        return api.put("/redStickers/addKey", redStickerKey);
    },
    addRedStickers(params) {
        return api.put("/redStickers/addRedStickers", params);
    }
};
