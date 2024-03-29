
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { VueEditor } from 'vue2-editor'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import moment from 'moment'
Vue.prototype.moment = moment
import VueSticky from 'vue-sticky-js';
Vue.use(VueSticky.install);
import AlertComponent from './components/Shared/Alert'
Vue.component('app-alert', AlertComponent)
Vue.component('vue-editor', VueEditor)
import { store } from './store'
import {router} from './router'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from './components/App'
const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router,
    store,
    created() {
        this.$store.dispatch('autoSignIn')
    }
});
