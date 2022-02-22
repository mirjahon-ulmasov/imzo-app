import axios from "@/services/api.js";

const state = {
  statistics: null,
  welcome: [],
};

const getters = {
  getStatistics(state) {
    return state.statistics;
  },
  getWelcome(state) {
    return state.welcome[0];
  },
};

const actions = {
  fetchStatistics(context, payload) {
    const { start, end } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(`main/statistics?start=${start}&end=${end}`)
        .then(response => response.data)
        .then(data => {
          context.commit("SET_STATISTICS", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },

  createWelcomeText(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("welcome/text", payload)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },

  fetchWelcomeText(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("welcome/text/get")
        .then(response => response.data)
        .then(data => {
          context.commit("SET_WELCOME", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_STATISTICS(state, payload) {
    state.statistics = payload;
  },
  SET_WELCOME(state, payload) {
    state.welcome = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
