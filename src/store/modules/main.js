import axios from "@/services/api.js";

const state = {
  statistics: null,
  lineChart: {},
  welcome: [],
  categories: [],
  subcategories: [],
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
  getCategories(state) {
    return state.categories.map(category => {
      return {
        value: category.id,
        title: category.name,
      };
    });
  },
  getSubCategories(state) {
    return state.subcategories;
  },
  getAllCategories(state) {
    return state.categories;
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
  // ---------------- Catalog Tab ----------------
  fetchCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("products/categories")
        .then(response => {
          commit("SET_CATEGORIES", response.data);
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  fetchCatalogs() {
    return new Promise((resolve, reject) => {
      axios
        .get("home/catalogs")
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  },
  createCatalog(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("home/catalogs/create", payload)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
  deleteCatalogById(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`home/catalogs/${payload}`)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
  updateCatalogById(_, { id, data }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`home/catalogs/${id}`, data)
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
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_SUB_CATEGORIES(state, payload) {
    state.subcategories = state.categories
      .find(category => category.id === payload)
      ?.children.map(subcategory => {
        return {
          value: subcategory.id,
          title: subcategory.name,
        };
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
