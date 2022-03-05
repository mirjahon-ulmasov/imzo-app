import axios from "axios";
const baseURL = process.env.VUE_APP_API;

import jwtDecode from "jwt-decode";
import {
  destroy_token,
  get_token,
  save_token,
} from "../../services/jwt.service";

const state = {
  user: null,
  is_authenticated: false,
};

const getters = {
  getRole(state) {
    return state.user.user_role;
  },
};

const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}admin/login`, payload)
        .then(response => response.data)
        .then(data => {
          if (data.token) {
            commit("SET_AUTH", data.token);
            resolve(data);
          }
        })
        .catch(err => reject(err));
    });
  },
  logout({ commit }) {
    commit("CLEAR_AUTH");
  },
  check_auth({ commit }) {
    const jwt = get_token();
    if (jwt) {
      commit("SET_AUTH", jwt);
    } else {
      commit("CLEAR_AUTH");
    }
  },
};

const mutations = {
  SET_AUTH(state, token) {
    state.user = jwtDecode(token.access_token);
    state.is_authenticated = true;
    save_token(token);
  },
  CLEAR_AUTH(state) {
    state.user = null;
    state.is_authenticated = false;
    destroy_token();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
