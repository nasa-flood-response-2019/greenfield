import 'whatwg-fetch';
import Vue from 'vue';
import store from './store'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue';
//import  VueWindowModal  from  'vue-window-modal';
//import DialogDrag from 'vue-dialog-drag';
//import * as VueWindow from '@hscmap/vue-window';

let geoJsonCurrentGauges;
let geoJsonGaugeDataForecast;

Vue.use(Vuetify);
//Vue.use(VueWindowModal);


Vue.prototype.$eventHub = new Vue();


let vm = new Vue({
    el: '#app',
    store,
    template:'<App/>',
    components:{
        App
    },
    data: {
        message: 'Hello Vue!'
    }
});




