import { createApp } from "vue";
import App from "./App.vue";
import { dragscrollNext } from "vue-dragscroll";
import router from "./router";
import store from "./store";
import NavBar from "./layout/NavBar.vue";
import Dropdown from "./components/helpers/Dropdown.vue";
import Searchbar from "./components/helpers/Searchbar.vue";
//styles
import "./assets/css/main.css";
import "./assets/scss/main.scss";

const app = createApp(App);

// global components
app
  .component("nav-bar", NavBar)
  .component("dropdown", Dropdown)
  .component("searchbar", Searchbar);
app.directive("dragscroll", dragscrollNext);
app.use(store).use(router);
app.mount("#app");
