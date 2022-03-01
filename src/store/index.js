import { createStore } from "vuex";
import mainModule from "./main.module";
import authModule from "./auth.module";
import userModule from "./user.module";
import showroomModule from "./showroom.module";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    main: mainModule,
    auth: authModule,
    user: userModule,
    showroom: showroomModule,
  },
});
