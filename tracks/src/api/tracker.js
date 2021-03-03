import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NGROK_API_URL } from "@env";

const instance = axios.create({
  baseURL: NGROK_API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
