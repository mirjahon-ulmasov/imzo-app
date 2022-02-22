// import axios from "@/services/api.js";
import axios from "axios";

const state = {};

const getters = {};

const actions = {
  auth({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://app.imzo.uz/api/v1/admin/login", payload)
        .then(response => {
          const token = response.data;
          commit("auth_success", token);
          resolve(response);
          localStorage.setItem("token", token.access);
          console.log(token);
        })
        .catch(err => reject(err));
    });
  },
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
