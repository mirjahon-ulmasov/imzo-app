import { createStore } from "vuex";
import mainModule from "./modules/main";
import authModule from "./modules/auth";
import userModule from "./modules/user";
import showroomModule from "./modules/showroom";

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
