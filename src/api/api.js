import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "https://jobly-backend-r3mk.onrender.com";

class JoblyApi {
  static token = localStorage.getItem("token"); // Read token from storage

  static async request(endpoint, data = {}, method = "get") {
    console.debug("📡 API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const params = method === "get" ? data : {};

    console.debug("🔍 Sending request to:", url);
    console.debug("🛠 Headers:", headers);

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("❌ API Error:", err.response);
      throw Array.isArray(err.response?.data?.error?.message)
        ? err.response.data.error.message
        : [err.response?.data?.error?.message || "Unknown error"];
    }
  }

  /** Register a new user */
  static async register(userData) {
    return await this.request("auth/register", userData, "post");
  }
}

export default JoblyApi;