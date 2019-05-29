import { api } from "../App";

export default {
    purchaseAdditionalDatas(params) {
        return api.post("/purchaseAdditionalData", params);
    },
    purchaseAdditionalData(id) {
        return api.get(`/purchaseAdditionalData/${id}`);
    },
    addPurchaseAdditionalDatas(params) {
        return api.put("/purchaseAdditionalData/add", params);
    },
    getNewPadData() {
        return api.get("purchaseAdditionalData/constructNew");
    }
};
