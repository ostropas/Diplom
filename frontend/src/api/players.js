import { api } from "../App";

export default {
    players(params) {
        return api.post("/players", params);
    },
    player(id) {
        return api.get(`/players/${id}`);
    },
    delPlayer(id) {
        return api.delete(`/players/${id}`);
    },
    changePlayer(id, data) {
        return api.put(`/players/${id}`, data);
    },
    countPlayers() {
        return api.get("/players/count");
    },
    getTransactions(user, limit) {
        return api.post("/players/transactions", { user, limit });
    }
};
