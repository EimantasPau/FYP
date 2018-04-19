import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
   state: {
       users: []
   },
   mutations: {
       loadUsers(state, users) {
           state.users = users;
       }
   },
   actions: {
       getUsers({commit}) {
           axios.get('/users')
               .then(response => commit('loadUsers', response.data)
               )
       }
   },
   getters: {
       users(state) {
           return state.users
       }
   }
});