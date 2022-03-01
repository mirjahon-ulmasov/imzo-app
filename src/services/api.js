import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";

const baseURL = process.env.VUE_APP_API;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2MjI5MDEwLCJqdGkiOiJjZmRkYzlhNjU2ZDc0MGE2ODg3ZmJiNTNmNzY1ZmZjYiIsInVzZXJfaWQiOjMsInVzZXJfcm9sZSI6MH0.wYSsoU34WbG-pmtOLu7htjLJJwoIc_Cb_U9SUTBdyNQ`,
  },
});

// let jwt = null;
// if (localStorage.getItem("jwt")) {
//   jwt = JSON.parse(localStorage.getItem("jwt"));
// }

// const instance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${jwt?.access}`,
//   },
// });

// instance.interceptors.request.use(async req => {
//   if (!jwt) {
//     jwt = localStorage.getItem("jwt")
//       ? JSON.parse(localStorage.getItem("jwt"))
//       : null;
//     req.headers.Authorization = `Bearer ${jwt?.access}`;
//   }

//   const user = jwt_decode(jwt.access);
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//   if (!isExpired) return req;

//   const response = await axios.post(`${baseURL}/....`, {
//     refresh: jwt.refresh,
//   });

//   localStorage.setItem("jwt", JSON.stringify(response.data));
//   req.headers.Authorization = `Bearer ${response.data.access}`;
//   return req;
// });

export default instance;
