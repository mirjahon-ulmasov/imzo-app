import axios from "@/services/api.js";

const state = {
  regions: null,
  districts: null,
  showroom: null,
  images: null,
  showroom_list: null,
};

const getters = {
  getShowroomList(state) {
    return state.showroom_list;
  },
  getShowroom(state) {
    return {
      name: state.showroom.name,
      latitude: state.showroom.latitude,
      longitude: state.showroom.longitude,
      district: state.showroom.district.id,
      address_street: state.showroom.address_street,
      address_house_number: state.showroom.address_house_number,
    };
  },
  getImages(state) {
    return state.showroom.images;
  },
  getDefaultPlace(state) {
    return {
      region: {
        title: state.showroom.region.name,
        value: state.showroom.region.id,
      },
      district: {
        title: state.showroom.district.name,
        value: state.showroom.district.id,
      },
    };
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
  fetchShowrooms(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`showroom/list/front?filter=${payload}`)
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
  // ---------------- CREATE SHOWROOM ----------------
  createShowroom(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("showroom/create", payload)
        .then(response => {
          context.dispatch("fetchShowrooms", "new");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  // ---------------- UPDATE SHOWROOM ----------------
  updateShowroomById(context, { id, data }) {
    return new Promise((resolve, reject) => {
      axios
        .put(`showroom/update/${id}`, data)
        .then(response => {
          context.dispatch("fetchShowrooms", "new");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  // ---------------- DELETE SHOWROOM ----------------
  deleteShowroomById(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`showroom/delete/${payload}`)
        .then(response => {
          context.dispatch("fetchShowrooms", "new");
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  // ---------------- GET SHOWROOM ----------------
  fetchShowroomById(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`showroom/update/detail/${payload}`)
        .then(response => response.data)
        .then(data => {
          context.commit("SET_SHOWROOM", data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  // ---------------- ADD image ----------------
  addShowroomImage(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("showroom/update/add/image", payload)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // ---------------- DELETE images ----------------
  deleteShowroomImage(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`showroom/delete/image/${payload}`)
        .then(res => resolve(res))
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
    state.images = payload.images;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
