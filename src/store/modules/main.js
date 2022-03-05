import axios from "@/services/api.js";

const state = {
  statistics: null,
  lineChart: {},
  welcome: [],
};

const getters = {
  getStatistics(state) {
    return state.statistics;
  },
  getLabelsChart(state) {
    return Object.keys(state.lineChart);
  },
  getDataChart(state) {
    return Object.values(state.lineChart);
  },
  getWelcome(state) {
    return state.welcome[0];
  },
};

const actions = {
  // ---------------- Statistics ----------------
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
  fetchLineChart(context, payload) {
    const { start, end, type } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(`diagram?start=${start}&end=${end}&type=${type}`)
        .then(response => response.data)
        .then(data => {
          context.commit("SET_LINECHART", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },

  // ---------------- Welcome Tab ----------------
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

  // ---------------- Banner Tab ----------------
  fetchBanners() {
    return new Promise((resolve, reject) => {
      axios
        .get("news/web")
        .then(response => response.data)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  createBanner(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("news/create", payload)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
  updateBannerById(_, { id, data }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`news/${id}/edit`, data)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
  deleteBannerById(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`news/${payload}/delete`)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_STATISTICS(state, payload) {
    state.statistics = payload;
  },
  SET_LINECHART(state, payload) {
    state.lineChart = payload;
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
