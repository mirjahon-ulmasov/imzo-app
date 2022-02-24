import { createStore } from "vuex";
import mainModule from "./main.module";
import authModule from "./auth.module";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    main: mainModule,
    auth: authModule,
  },
});
