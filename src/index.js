import 'whatwg-fetch';
import Vue from 'vue';
import store from './store'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue';

// import EventHub from 'vue-event-hub';

let geoJsonCurrentGauges;
let geoJsonGaugeDataForecast;

Vue.use(Vuetify);
// Vue.use(EventHub);

Vue.prototype.$eventHub = new Vue();

let vm = new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    data: {
        message: 'Hello Vue!'
    }
})
