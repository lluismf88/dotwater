import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import overlay from "./plugins/overlay";
Vue.use(overlay);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_API_MAP,
        libraries: "places,visualization", // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
