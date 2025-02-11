import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "https://jobly-backend-r3mk.onrender.com";
class JoblyApi {
  static token = localStorage.getItem("token"); // Read token from storage

  static async request(endpoint, data = {}, method = "get") {
    console.debug("📡 API Call:", endpoint, data, method);
  
    const url = `${BASE_URL}/${endpoint}`;
    console.debug("🔑 Using token:", JoblyApi.token); // ✅ Check token before sending
  
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {};
    const params = method === "get" ? data : {};
  
    console.debug("🔍 Sending request with headers:", headers); // ✅ Debugging log
  
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("❌ API Error:", err.response);
      throw Array.isArray(err.response.data.error.message)
        ? err.response.data.error.message
        : [err.response.data.error.message];
    }
  }

  /** Login a user and return user data */
  static async login(username, password) {
    // Get token from API
    let res = await this.request("auth/token", { username, password }, "post");
    let token = res.token;

    // Store token and set for future API requests
    localStorage.setItem("token", token);
    JoblyApi.token = token;

    // Fetch user details
    let user = await this.request(`users/${username}`);
    return user;
  }

  /** Get company details */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies */
  static async getCompanies(name = "") {
    let params = name ? { name } : {};
    let res = await this.request("companies", params);
    return res.companies;
  }

  /** Get all users (Admin only) */
  static async getUsers() {
    let res = await this.request("users");
    return res.users;
  }

  static async getJobs(title = "") {
    let params = title ? { title } : {};
    let res = await this.request("jobs", params);
    return res.jobs;
  }

 /** Apply to a job */
static async applyToJob(jobId) {
  console.log("Applying to job:", jobId); // ✅ Debugging log
  let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
  return res.applied;
}

  static async updateUser(username, data) {
    console.debug("🔄 Updating profile for:", username, data);
    return await this.request(`users/${username}`, data, "patch");
  }
}

export default JoblyApi;
