import dayjs from "dayjs";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { get_token, save_token } from "./jwt.service";
import store from "../store";
import router from "../router";

const baseURL = process.env.VUE_APP_API;

let jwt = null;
if (get_token()) {
  jwt = get_token();
}

axios.defaults.headers.common["Authorization"] = `Bearer ${jwt?.access_token}`;
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt?.access_token}`,
  },
});

instance.interceptors.request.use(async req => {
  if (!jwt) {
    jwt = get_token() ? get_token() : null;
    req.headers.Authorization = `Bearer ${jwt?.access_token}`;
  }

  const user = jwt_decode(jwt.access_token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  try {
    const response = await axios.post(`${baseURL}user/token/refresh`, {
      refresh: jwt.refresh_token,
    });
    save_token({
      refresh_token: jwt.refresh_token,
      access_token: response.data.access,
    });
    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  } catch (err) {
    store.dispatch("logout");
    router.push("/login");
  }
});

export default instance;
