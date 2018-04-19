
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { store } from './store'
import Home from './components/Home'
const routes = [
    {
        path: '/users',
        component: ExampleComponent,
        name: 'Example'
    },
    {
        path: '/',
        component: Home,
        name: 'Home'
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import ExampleComponent from './components/ExampleComponent'
Vue.component('example-component', require('./components/ExampleComponent.vue'));
const app = new Vue({
    el: '#app',
    components: {
        ExampleComponent
    },
    router,
    store,
    created() {
        this.$store.dispatch('getUsers')
    }
});