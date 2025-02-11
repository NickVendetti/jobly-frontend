import axios from "axios";

const BASE_URL = import.meta.env?.VITE_APP_BASE_URL ?? "https://jobly-backend-r3mk.onrender.com";

class JoblyApi {
  static token = localStorage.getItem("token"); // Read token from storage

  static async request(endpoint, data = {}, method = "get") {
    console.debug("📡 API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const params = method === "get" ? data : {};

    console.debug("🔍 Sending request with headers:", headers); // ✅ Debugging log

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("❌ API Error:", err.response);
      throw Array.isArray(err.response?.data?.error?.message)
        ? err.response.data.error.message
        : [err.response?.data?.error?.message || "Unknown error"];
    }
  }

  /** Apply to a job */
  static async applyToJob(jobId) {
    let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
    return res.applied;
  }
}

export default JoblyApi;