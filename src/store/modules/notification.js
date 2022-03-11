import axios from "@/services/api.js";

const state = {
  notification_list: [1, 2],
  notification_users: null,
  notification: null,
};

const getters = {
  getNotificationList(state) {
    return state.notification_list;
  },
  getNotificationById(state) {
    return state.notification;
  },
  getUsers(state) {
    return state.notification_users;
  },
  getDefaultUsers() {
    return null;
  },
};

const actions = {
  // ---------------- GET NOTIFICATION list ----------------
  fetchNotifications(context) {
    return new Promise((resolve, reject) => {
      axios
        .get(`notification`)
        .then(response => response.data)
        .then(data => {
          context.commit("SET_NOTIFICATION_LIST", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  // ---------------- GET NOTIFICATION by ID ----------------
  fetchNotificationById(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`notification/${payload}`)
        .then(response => response.data)
        .then(data => {
          context.commit("SET_NOTIFICATION", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },

  // ---------------- GET NOTIFICATION USERS ----------------
  fetchUsers(context, { gender, region, district, search }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `notification/users?gender=${gender}&region=${region}&district=${district}&search=${search}`
        )
        .then(response => response.data)
        .then(data => {
          context.commit("SET_USERS", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },

  // ---------------- CREATE NOTIFICATION ----------------
  createNotification(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("notification/create", payload)
        .then(response => {
          context.dispatch("fetchNotifications");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },

  // ---------------- UPDATE NOTIFICATION ----------------
  updateNotificationById(context, { id, data }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`notification/${id}`, data)
        .then(response => {
          context.dispatch("fetchNotifications");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },

  // ---------------- DELETE NOTIFICATION ----------------
  deleteNotificationById(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`notification/${payload}`)
        .then(response => {
          context.dispatch("fetchNotifications");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_USERS(state, payload) {
    state.notification_users = payload;
  },
  SET_NOTIFICATION_LIST(state, paylaod) {
    state.notification_list = paylaod;
  },
  SET_NOTIFICATION(state, payload) {
    state.notification = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
