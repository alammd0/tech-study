import axios from "axios";
import { BACKEND_URL } from "./backendURL";

// create axios instance
export const instance = axios.create({
  baseURL: `${BACKEND_URL}`,
});

// create function to connect with API
export const apiconnector = async (url, method, data = null, headers = {}) => {
  try {
    const response = await instance({
      url,
      method,
      data,
      headers,
    });

    return response;
  } catch (err) {
    console.error("API error:", err);
    return err.response ?? { success: false, message: "Network error" };
  }
};
