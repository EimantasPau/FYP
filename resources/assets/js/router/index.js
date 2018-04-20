import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import ExampleComponent from '../components/ExampleComponent'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/users',
            component: ExampleComponent,
            name: 'Example',
            beforeEnter: AuthGuard
        },
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/signup',
            component: Signup,
            name: 'Signup'
        },
        {
            path: '/signin',
            component: Signin,
            name: 'Signin'
        }
    ],
    mode: 'history'
})