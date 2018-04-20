import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
   state: {
       user: null,
       users: [],
       loading: false,
       error: null
   },
   mutations: {
       loadUsers(state, payload) {
           state.users = payload;
       },
       setUser(state, payload) {
           state.user = payload;
       },
       setLoading(state, payload) {
           state.loading = payload
       },
       setError(state, payload) {
            state.error = payload
       },
       clearError(state) {
           state.error = null
       }
   },
   actions: {
       getUsers({commit}) {
           const token = localStorage.getItem('token')
           axios.get('/api/users?token=' + token)
               .then(response => commit('loadUsers', response.data))
       },
       autoSignIn({commit}) {
           const token = localStorage.getItem('token')
           if(token){
               axios.get('/api/user?token=' + token)
                   .then(response => {
                       console.log(response)
                       commit('setUser', response.data.user)
                   })
           }
       },
       signUserUp({commit}, payload) {
           commit('setLoading', true)
           commit('clearError')
           axios.post('/api/signup', payload)
               .then(response => {
                   commit('setLoading', false)
                   commit('setUser',response.data.user)
               })
               .catch(errors => {
                   commit('setLoading', false)
                   commit('setError', errors.response.data.errors)
                   console.log(errors.response.data.errors)
               })
       },
       signUserIn({commit}, payload) {
           commit('setLoading', true)
           commit('clearError')
           axios.post('/api/signin', payload)
               .then(response => {
                   commit('setLoading', false)
                   commit('setUser',response.data.user)
                   const token = response.data.token
                   localStorage.setItem('token', token)
                  commit('setUser', response.data.user)
               })
               .catch(errors => {
                   commit('setLoading', false)
                   commit('setError', errors.response.data.errors)
                   console.log(errors.response.data.errors)
               })
       },
       logOut({commit}) {
           localStorage.setItem('token', null)
           commit('setUser', null)
       },
       clearError({commit}) {
           commit('clearError')
       }
   },
   getters: {
       users(state) {
           return state.users
       },
       user(state) {
           return state.user
       },
       error(state) {
           return state.error
       },
       loading(state) {
           return state.loading
       }
   }
});