import { api } from "../App";

export default {
  getNickname() {
    return api.get("/user");
  }
};
