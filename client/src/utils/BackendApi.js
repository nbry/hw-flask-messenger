import axios from "axios";

class BackendApi {
  // Function to provide backbone for making HTTP requests to the Backend API
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

    try {
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb.
      return (
        await axios({
          method: verb,
          url: `${BASE_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData,
        })
      ).data;
    } catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // ********************
  // AUTH
  static async register({ username, password, email }) {
    let res = await this.request(
      "register",
      { username, password, email },
      "post"
    );
    return res;
  }

  static async login({ username, password }) {
    let res = await this.request("login", { username, password }, "post");
    return res;
  }
}

export default BackendApi;
