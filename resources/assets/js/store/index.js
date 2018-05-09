import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import {router} from "../router/index"


export const store = new Vuex.Store({
   state: {
       user: null,
       tutors: null,
       loading: false,
       uploading: false,
       conversations: [],
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
           lessonUpdate: null,
           questionCreate: null
       },
       //for modals, to deal with not closing when errors are present
       isDisplaying: {
           updateDialog: false
       }

   },
   mutations: {
       setUser(state, payload) {
           state.user = payload
       },
       setTutors(state, payload) {
         state.tutors = payload
       },
       setConversations(state, payload) {
         state.conversations = payload
       },
       addConversation(state, payload) {
         state.conversations.push(payload.group)
       },
       addMessage(state, payload) {
           let conv = state.conversations.find(conversation => conversation.id == payload.group_id)
           conv.conversations.push(payload)

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
           course.lessons.push(payload)
       },
       updateLesson(state, payload) {
           console.log('updating')
           let course = state.user.owned_courses.find(course => course.id == payload.course_id)
           console.log('old course is ' +course)
           let oldLesson = course.lessons.find(lesson => lesson.id == payload.id)
           console.log('old oldLesson is ' +oldLesson)
           let oldIndex = course.lessons.indexOf(oldLesson)
           console.log('old index is ' +oldIndex)
           course.lessons[oldIndex] = payload
       },
       deleteLesson(state, payload) {
           let course = state.user.owned_courses.find(course => course.id == payload.course_id)
           let index = course.lessons.indexOf(payload)
           course.lessons.splice(index, 1)
       },
   },
   actions: {
       //tutors
       getTutors({commit}, payload) {
           commit('setLoading', true)
           const token = localStorage.getItem('token')
           axios.get('/api/users?token=' + token, payload)
               .then(response => {
                   commit('setLoading', false)
                   commit('setTutors', response.data.tutors)
               })
               .catch(errors => {
                   commit('setLoading', false)
                 console.log("Oops. Something went wrong.")
               })
       },
       getConversations({commit}, payload) {
           let token = localStorage.getItem('token')
           return new Promise((resolve, reject) => {
               // Do something here... lets say, a http call using vue-resource
               axios.get('/api/groups?token=' + token).then(response => {
                   // http success, call the mutator and change something in state
                   commit('setConversations', response.data.groups)
                   resolve(response);  // Let the calling function know that http is done. You may send some data back
               }, error => {
                   // http failed, let the calling function know that action did not work out
                   reject(error);
               })
           })
       },
       addConversation({commit}, payload) {
         commit('addConversation', payload)
       },
       addMessage({commit}, payload) {
           let token = localStorage.getItem('token')
           return new Promise((resolve, reject) => {
               // Do something here... lets say, a http call using vue-resource
               axios.post('/api/conversations?token=' + token, payload).then(response => {
                   // http success, call the mutator and change something in state
                   commit('addMessage', response.data.conversation)
                   resolve(response);  // Let the calling function know that http is done. You may send some data back
               }, error => {
                   // http failed, let the calling function know that action did not work out
                   reject(error);
               })
           })

       },
       startConversation({commit}, payload) {
           let token = localStorage.getItem('token')
           axios.post('/api/groups?token=' + token, payload)
               .then(response => {
                   // console.log(response.data.group)
                   // commit('addConversation', response.data.group)
                   router.push('/conversations')
               })
               .catch(errors => {
                   console.log(errors.data)
                   alert('Conversation already started!')
               })
       },
       insertMessage({commit}, payload) {
         commit('addMessage', payload)
       },
       //courses
       addCourse({commit}, payload) {
           commit('clearError', 'courseCreate')
           const token = localStorage.getItem('token')
           axios.post('/api/courses?token=' + token, payload)
               .then(response => {
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
           console.log(payload)
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
           console.log(payload.lesson_id)
           commit('setUploading', true)
           commit('clearError', 'lessonUpdate')
           const token = localStorage.getItem('token')
           let url = '/api/lessons/'+ payload.lesson_id +'?token='+ token
           axios.post(url, payload.formData,  {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           })
               .then(response => {
                   console.log(response)
                   commit('setUploading', false)
                   commit('updateLesson', response.data.lesson)
                   router.push('/account/courses/' + response.data.lesson.course_id + '/lessons')
               })
               .catch(errors => {
                   let payload = {
                       form: 'lessonUpdate',
                       errors : errors.response.data.errors
                   }
                   commit('setUploading', false)
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
       setError({commit}, payload) {
         commit('setError', payload)
       },
       setDisplaying({commit}, payload) {
           commit('setDisplaying', payload)
       }

   },
   getters: {
       tutors(state) {
           return state.tutors
       },
       conversations(state) {
           return state.conversations
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