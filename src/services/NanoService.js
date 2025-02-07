import api from "../api/NanoApi";

class NanoService {
  async get(data, config) {
    return await api.get("/api/v1/quiz/Content/visitor-content");
  }
  async post(data, config) {
    return await api.post("/api/v1/quiz/Convert/convert", data, config);
  }
}

export default new NanoService();
