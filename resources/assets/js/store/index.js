import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
   state: {
       user: null,
       users: []
   },
   mutations: {
       loadUsers(state, payload) {
           state.users = payload;
       },
       setUser(state, payload){
           state.user = payload;
       }
   },
   actions: {
       getUsers({commit}) {
           axios.get('/api/users')
               .then(response => commit('loadUsers', response.data))
       },
       signUserUp({commit}, payload) {
           axios.post('/api/signup', payload)
               .then(response => commit('setUser',response.data.user))
               .catch(errors => console.log(errors.response.data.errors))
       }
   },
   getters: {
       users(state) {
           return state.users
       },
       user(state) {
           return state.user
       }
   }
});