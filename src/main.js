import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
import router from "./router";
import VueAxios from "vue-axios";
import NavBar from "./layout/NavBar.vue";
import { dragscrollNext } from "vue-dragscroll";
import Select from "./components/helpers/Select.vue";
import Dropdown from "./components/helpers/Dropdown.vue";
import Searchbar from "./components/helpers/Searchbar.vue";
import Datepicker from "./components/helpers/DatePicker.vue";
import Notification from "./components/helpers/Notification.vue";
import LoadingSpinner from "./components/helpers/LoadingSpinner.vue";

//styles
import "./assets/css/main.css";
import "./assets/scss/main.scss";
import "animate.css";

const app = createApp(App);
app.use(VueAxios, axios);
// global components
app
  .component("notification", Notification)
  .component("nav-bar", NavBar)
  .component("dropdown", Dropdown)
  .component("v-select", Select)
  .component("searchbar", Searchbar)
  .component("datepicker", Datepicker)
  .component("spinner", LoadingSpinner);

app.directive("dragscroll", dragscrollNext);
app.use(store).use(router);
app.mount("#app");
