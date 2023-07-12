import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";


createApp(App)
    .use(router)
    // .use(ElementPlus)
    .mount(document.getElementById("app"));
