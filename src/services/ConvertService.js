import api from "../api/BaseApi";

class ConvertService {
  async post(data, config) {
    return await api.post("/convert/doc/to/pdf", data, config);
  }
}

export default new ConvertService();
