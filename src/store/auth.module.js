// import axios from "@/services/api.js";

const state = {};

const getters = {};

const actions = {
  // login({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post("user/token", payload)
  //       .then(response => {
  //         const token = response.data;
  //         commit("auth_success", token);
  //         resolve(response);
  //         localStorage.setItem("token", token.access);
  //         console.log(token);
  //       })
  //       .catch(err => reject(err));
  //   });
  // },
};

const mutations = {
  auth_success(state, token) {
    state.status = "success";
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
