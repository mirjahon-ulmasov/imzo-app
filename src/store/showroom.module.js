import axios from "@/services/api.js";

const state = {
  regions: null,
  districts: null,
  showroom: null,
  showroom_list: null,
};

const getters = {
  getShowroomList(state) {
    return state.showroom_list;
  },
  getRegions(state) {
    return state.regions?.map(region => {
      return {
        title: region.name,
        value: region.id,
      };
    });
  },
  getDistricts(state) {
    return state.districts?.map(district => {
      return {
        title: district.name,
        value: district.id,
      };
    });
  },
};

const actions = {
  fetchShowrooms(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("showroom/list/front")
        .then(response => response.data)
        .then(data => {
          context.commit("SET_SHOWROOM_LIST", data);
          resolve(data.items);
        })
        .catch(err => reject(err));
    });
  },
  fetchRegions(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("region")
        .then(response => response.data)
        .then(data => {
          context.commit("SET_REGIONS", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  fetchDistricts(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`region/${payload}/districts`)
        .then(response => response.data)
        .then(data => {
          context.commit("SET_DISTRICTS", data.items);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  createShowroom(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("showroom/create", payload)
        .then(response => {
          context.dispatch("fetchShowrooms");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  updateShowroomById(context, { id, data }) {
    return new Promise((resolve, reject) => {
      axios
        .put(`showroom/update/${id}`, data)
        .then(response => {
          context.dispatch("fetchShowrooms");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  deleteShowroomById(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`showroom/delete/${payload}`)
        .then(response => {
          context.dispatch("fetchShowrooms");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  fetchShowroomById(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`showroom/update/detail/${payload}`)
        .then(response => response.data)
        .then(data => {
          console.log(data);
          // context.commit("SET_SHOWROOM", data);
        })
        .catch(err => reject(err));
    });
  },
  fetchShowroomImages(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`showroom/${payload}/images`)
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_SHOWROOM_LIST(state, payload) {
    state.showroom_list = payload;
  },
  SET_REGIONS(state, payload) {
    state.regions = payload;
  },
  SET_DISTRICTS(state, payload) {
    state.districts = payload;
  },
  SET_SHOWROOM(state, payload) {
    state.showroom = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
