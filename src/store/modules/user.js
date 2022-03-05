import axios from "@/services/api.js";

const state = {
  Users: [],
};

const getters = {};

const actions = {
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("admin/users")
        .then(response => {
          commit("SET_USERS", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

const mutations = {
  SET_USERS(state, Users) {
    state.Users = Users;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
