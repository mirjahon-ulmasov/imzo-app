import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";

const baseURL = process.env.VUE_APP_API;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`,
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
