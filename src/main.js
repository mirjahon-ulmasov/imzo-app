import { createApp } from "vue";
import App from "./App.vue";
import { dragscrollNext } from "vue-dragscroll";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";
import NavBar from "./layout/NavBar.vue";
import Dropdown from "./components/helpers/Dropdown.vue";
import Searchbar from "./components/helpers/Searchbar.vue";
import Datepicker from "./components/helpers/DatePicker.vue";
import Notification from "./components/helpers/Notification.vue";
import Select from "./components/helpers/Select.vue";

//styles
import "./assets/css/main.css";
import "./assets/scss/main.scss";

const app = createApp(App);
app.use(VueAxios, axios);
// global components
app
  .component("notification", Notification)
  .component("nav-bar", NavBar)
  .component("dropdown", Dropdown)
  .component("v-select", Select)
  .component("searchbar", Searchbar)
  .component("datepicker", Datepicker);

app.directive("dragscroll", dragscrollNext);
app.use(store).use(router);
app.mount("#app");
