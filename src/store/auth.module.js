// import axios from "@/services/api.js";
import axios from "axios";

const state = {
  user: {},
};

const getters = {};

const actions = {
  auth({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://app.imzo.uz/api/v1/admin/login")
        .then(response => {
          const token = response.data;
          commit("auth_success", token, user);
          resolve(response);
          console.log(token);
        })
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
