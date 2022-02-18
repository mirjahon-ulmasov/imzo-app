import { createApp } from "vue";
import App from "./App.vue";
import { dragscrollNext } from "vue-dragscroll";
import router from "./router";
import store from "./store";
import NavBar from "./layout/NavBar.vue";
import Dropdown from "./components/helpers/Dropdown.vue";
import Searchbar from "./components/helpers/Searchbar.vue";
import Datepicker from "./components/helpers/DatePicker.vue";

//styles
import "./assets/css/main.css";
import "./assets/scss/main.scss";

const app = createApp(App);

// global components
app
  .component("nav-bar", NavBar)
  .component("dropdown", Dropdown)
<<<<<<< HEAD
  .component("searchbar", Searchbar)
  .component("datepicker", Datepicker);

=======
  .component("searchbar", Searchbar);
app.directive("dragscroll", dragscrollNext);
>>>>>>> 37ff35a620f7371607af9b4ae77402bf19fa468f
app.use(store).use(router);
app.mount("#app");
