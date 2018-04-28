import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import {router} from "../router/index"


export const store = new Vuex.Store({
   state: {
       user: null,
       users: [],
       loading: false,
       uploading: false,
       //errors from different forms
       errors: {
           signIn: null,
           signUp: null,
           basicInfo: null,
           educationCreate: null,
           educationUpdate: null,
           experienceCreate: null,
           experienceUpdate: null,
           courseCreate: null,
           courseUpdate: null,
           lessonCreate: null,
           lessonUpdate: null
       },
       //for modals, to deal with not closing when errors are present
       isDisplaying: {
           updateDialog: false
       }

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
       setUploading(state, payload) {
           state.uploading = payload
       },
       setError(state, payload) {
           state.errors[payload.form] = payload.errors
       },
       setDisplaying(state, payload) {
           state.isDisplaying[payload.form] = payload.isDisplaying
       },
       clearError(state, payload) {
           state.errors[payload] = null
       },
       addSkill(state, payload) {
           state.user.skills.push(payload)
       },
       removeSkill(state, payload) {
           var index = state.user.skills.indexOf(payload)
           state.user.skills.splice(index, 1)
       },
       addEducation(state, payload) {
           state.user.education.push(payload)
       },
       updateEducation(state, payload) {
           let oldEducation = state.user.education.find(education => education.id == payload.id)
           let oldIndex = state.user.education.indexOf(oldEducation)
           state.user.education[oldIndex] = payload
       },
       deleteEducation(state, payload) {
           let index = state.user.education.indexOf(payload)
           state.user.education.splice(index, 1)
       },
       addExperience(state, payload) {
           state.user.experience.push(payload)
       },
       updateExperience(state, payload) {
           let oldExperience = state.user.experience.find(experience => experience.id == payload.id)
           let oldIndex = state.user.experience.indexOf(oldExperience)
           state.user.experience[oldIndex] = payload
       },
       deleteExperience(state, payload) {
           let index = state.user.experience.indexOf(payload)
           state.user.experience.splice(index, 1)
       },
       addCourse(state, payload) {
           state.user.owned_courses.push(payload)
       },
       updateCourse(state, payload) {
           let oldCourse = state.user.owned_courses.find(course => course.id == payload.id)
           let oldIndex = state.user.owned_courses.indexOf(oldCourse)
           state.user.owned_courses[oldIndex] = payload
       },
       deleteCourse(state, payload) {
           let index = state.user.owned_courses.indexOf(payload)
           state.user.owned_courses.splice(index, 1)
       },
       addLesson(state, payload) {
           let course = state.user.owned_courses.find(course => course.id == payload.course_id)
           console.log(course)
           course.lessons.push(payload)
       },
       updateLesson(state, payload) {
           let oldCourse = state.user.owned_courses.find(course => course.id == payload.id)
           let oldIndex = state.user.owned_courses.indexOf(oldCourse)
           state.user.owned_courses[oldIndex] = payload
       },
       deleteLesson(state, payload) {
           let course = state.user.owned_courses.find(course => course.id == payload.course_id)
           let index = course.lessons.indexOf(payload)
           course.lessons.splice(index, 1)
       },
   },
   actions: {
       //courses
       addCourse({commit}, payload) {
           commit('clearError', 'courseCreate')
           const token = localStorage.getItem('token')
           axios.post('/api/courses?token=' + token, payload)
               .then(response => {
                   console.log(JSON.stringify(response.data.course))
                   commit('addCourse', response.data.course)
                   router.push('/account/courses')
               })
               .catch(errors => {
                   let payload = {
                       form: 'courseCreate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
       deleteCourse({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.delete('/api/courses/' + payload.id +  '?token=' + token, payload)
               .then(() => commit('deleteCourse', payload))
       },
       updateCourse({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.put('/api/courses/' + payload.id +  '?token=' + token, payload)
               .then(response => {
                   commit('updateCourse', response.data.course)
                   router.push('/account/courses')
               })
               .catch(errors => {
                   let payload = {
                       form: 'courseUpdate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
       addLesson({commit}, payload) {
           commit('setUploading', true)
           commit('clearError', 'lessonCreate')
           const token = localStorage.getItem('token')

           axios.post('/api/lessons?token=' + token, payload,  {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           })
               .then(response => {
                   commit('setUploading', false)
                   commit('addLesson', response.data.lesson)
                   router.push('/account/courses/' + response.data.lesson.course_id + '/lessons')
               })
               .catch(errors => {
                   let payload = {
                       form: 'lessonCreate',
                       errors : errors.response.data.errors
                   }
                   commit('setUploading', false)
                   commit('setError', payload)
               })
       },
       deleteLesson({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.delete('/api/lessons/' + payload.id +  '?token=' + token, payload)
               .then(() => commit('deleteLesson', payload))
       },
       updateLesson({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.put('/api/courses/' + payload.id +  '?token=' + token, payload)
               .then(response => {
                   commit('updateCourse', response.data.course)
                   router.push('/account/courses')
               })
               .catch(errors => {
                   let payload = {
                       form: 'courseUpdate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
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

       //experience actions
       addExperience({commit}, payload) {
           commit('clearError', 'experienceCreate')
           const token = localStorage.getItem('token')
           axios.post('/api/experience?token=' + token, payload)
               .then(response => {
                   console.log('success')
                   commit('addExperience', response.data.experience)
                   router.push('/account/experience')
               })
               .catch(errors => {
                   let payload = {
                       form: 'experienceCreate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
       deleteExperience({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.delete('/api/experience/' + payload.id +  '?token=' + token, payload)
               .then(() => commit('deleteExperience', payload))
       },
       updateExperience({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.put('/api/experience/' + payload.id +  '?token=' + token, payload)
               .then(response => {
                   commit('updateExperience', response.data.experience)
                   router.push('/account/experience')
               })
               .catch(errors => {
                   let payload = {
                       form: 'experienceUpdate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },

       //education actions
       addEducation({commit}, payload) {
           // commit('clearError', 'educationForm')
           const token = localStorage.getItem('token')
           axios.post('/api/education?token=' + token, payload)
               .then(response => {
                   console.log('success')
                   commit('addEducation', response.data.education)
                   router.push('/account/education')
               })
               .catch(errors => {
                   let payload = {
                       form: 'educationCreate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
       deleteEducation({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.delete('/api/education/' + payload.id +  '?token=' + token, payload)
               .then(() => commit('deleteEducation', payload))
       },
       updateEducation({commit}, payload) {
           const token = localStorage.getItem('token')
           axios.put('/api/education/' + payload.id +  '?token=' + token, payload)
               .then(response => {
                   commit('updateEducation', response.data.education)
                   router.push('/account/education')
               })
               .catch(errors => {
                   let payload = {
                       form: 'educationUpdate',
                       errors : errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
       //user actions
       getUsers({commit}) {
           axios.get('/api/users')
               .then(response => commit('loadUsers', response.data))
       },
       updateUser({commit}, payload) {
           commit('clearError', 'basicInfo')
           commit('setLoading', true)
           const token = localStorage.getItem('token')
           axios.post('/api/user?token=' + token, payload,
               {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           })
               .then(response => {
                   commit('setLoading', false)
                   commit('setUser', response.data.user)
                   let payload = {
                       form: 'updateDialog',
                       isDisplaying: false
                   }
                   commit('setDisplaying', payload)
               })
               .catch(errors => {
                   commit('setLoading', false)
                   let payload = {
                       form: 'basicInfo',
                       errors: errors.response.data.errors
                   }
                   commit('setError', payload)
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
           commit('clearError', 'signUp')
           axios.post('/api/signup', payload)
               .then(response => {
                   commit('setLoading', false)
                   commit('setUser',response.data.user)
                   dispatch('signUserIn', payload)
               })
               .catch(errors => {
                   commit('setLoading', false)

                   let payload = {
                       form: 'signUp',
                       errors: errors.response.data.errors
                   }

                   commit('setError', payload)
               })
       },
       signUserIn({commit}, payload) {
           commit('setLoading', true)
           commit('clearError', 'signIn')
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
                   let payload = {
                       form: 'signIn',
                       errors: errors.response.data.errors
                   }
                   commit('setError', payload)
               })
       },
       logOut({commit}) {
           localStorage.clear();
           commit('setUser', null)
       },

       //general actions
       clearError({commit}, payload) {
           commit('clearError', payload)
       },
       setDisplaying({commit}, payload) {
           commit('setDisplaying', payload)
       }

   },
   getters: {
       users(state) {
           return state.users
       },
       user(state) {
           return state.user
       },
       errors(state) {
           return state.errors
       },
       loading(state) {
           return state.loading
       },
       uploading(state) {
           return state.uploading
       },
       isDisplaying(state) {
           return state.isDisplaying
       }
   }
});