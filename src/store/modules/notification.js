// import axios from "@/services/api.js";

const state = {
  notif_users: null,
};

const getters = {
  getUsers(state) {
    return state.notif_users;
  },
  getDefaultUsers() {
    return null;
  },
};

const actions = {
  fetchUsers(context, { gender, region, district, search }) {
    console.log(gender, region, district, search);
    // return new Promise((resolve, reject) => {
    //   axios
    //     .get(
    //       `?gender=${gender}&region=${region}&district=${district}&search=${search}`
    //     )
    //     .then(response => response.data)
    //     .then(data => {
    //       context.commit("SET_USERS", data);
    //       resolve(data);
    //     })
    //     .catch(err => reject(err));
    // });
  },
};

const mutations = {
  SET_USERS(state, payload) {
    state.notif_users = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
