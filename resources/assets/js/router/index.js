import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
//auth components
import Signup from '../components/Signup'
import Signin from '../components/Signin'
//student components
import StudentAccount from '../components/Student/Account'
import StudentCourses from '../components/Student/Courses'
import StudentProfile from '../components/Student/Profile'
//tutor components
import TutorAccount from '../components/Tutor/Account'
import TutorCourses from '../components/Tutor/Courses'
import TutorProfile from '../components/Tutor/Profile'
import ExampleComponent from '../components/ExampleComponent'
import NotFoundComponent from '../components/NotFoundComponent'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/users',
            component: ExampleComponent,
            name: 'Example'
        },
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        //student account routes
        {
            path: '/student/account',
            component: StudentAccount,
            children: [
                {
                    path: '',
                    component: StudentProfile
                },
                {
                    path: 'courses',
                    component: StudentCourses
                }
            ]
        },
        //tutor account routes
        {
            path: '/tutor/account',
            component: TutorAccount,
            children: [
                {
                    path: 'courses',
                    component: TutorCourses
                },
                {
                    path: '',
                    component: TutorProfile
                }
            ]

        },
        //registration and login
        {
            path: '/signup',
            component: Signup,
            name: 'Signup'
        },
        {
            path: '/signin',
            component: Signin,
            name: 'Signin'
        },
        //404 component
        {
            path: '*',
            component: NotFoundComponent }
    ],
    mode: 'history'
})