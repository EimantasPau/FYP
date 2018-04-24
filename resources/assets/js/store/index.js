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
       },
       addSkill(state, payload) {
           state.user.skills.push(payload)
       },
       removeSkill(state, payload) {
           state.user.skills.splice(payload, 1)
       }
   },
   actions: {
       //skills
       addSkill({commit}, payload){
           const token = localStorage.getItem('token');
         axios.post('/api/skills?token=' + token, payload)
             .then(response => commit('addSkill', response.data.skill))
       },
       removeSkill({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.delete('/api/skills/' + payload.id + '?token=' + token)
               .then(() => commit('removeSkill', payload))
       },
       //user actions
       getUsers({commit}) {
           axios.get('/api/users')
               .then(response => commit('loadUsers', response.data))
       },
       updateUser({commit}, payload) {
           commit('clearError')
           commit('setLoading', true)
           const token = localStorage.getItem('token')
           axios.post('/api/user?token=' + token , payload,
               {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           })
               .then(response => {
                   commit('setLoading', false)
                   console.log('success')
                   commit('setUser', response.data.user)
               })
               .catch(errors => {
               commit('setLoading', false)
               commit('setError', errors.response.data.errors)
           })
       },
       autoSignIn({commit}) {
           const token = localStorage.getItem('token')
           if(token){
               axios.get('/api/user?token=' + token)
                   .then(response => {
                       commit('setUser', response.data.user)
                   })
           }
       },
       signUserUp({commit, dispatch}, payload) {
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
               })

           dispatch('signUserIn', payload)
       },
       signUserIn({commit}, payload) {
           commit('setLoading', true)
           commit('clearError')
           axios.post('/api/signin', payload)
               .then(response => {
                   commit('setLoading', false)
                   console.log(response.data.user)
                   commit('setUser',response.data.user)
                   const token = response.data.token
                   localStorage.setItem('token', token)
                  commit('setUser', response.data.user)
               })
               .catch(errors => {
                   commit('setLoading', false)
                   commit('setError', errors.response.data.errors)
               })
       },
       logOut({commit}) {
           localStorage.setItem('token', null)
           commit('setUser', null)
       },

       //general actions
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