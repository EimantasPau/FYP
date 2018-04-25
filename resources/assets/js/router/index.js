import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
//auth components
import Signup from '../components/Signup'
import Signin from '../components/Signin'
//account components
import Account from '../components/User/Account'
import Courses from '../components/User/Courses'
import Profile from '../components/User/Profile'

//education components
import Education from '../components/User/Education/Education'
import EducationCreate from '../components/User/Education/EducationCreate'
import EducationIndex from '../components/User/Education/EducationIndex'
import EducationUpdate from '../components/User/Education/EducationUpdate'
//experience components
import Experience from '../components/User/Experience/Experience'
import ExperienceCreate from '../components/User/Experience/ExperienceCreate'
import ExperienceIndex from '../components/User/Experience/ExperienceIndex'
import ExperienceUpdate from '../components/User/Experience/ExperienceUpdate'

import ExampleComponent from '../components/ExampleComponent'
import NotFoundComponent from '../components/NotFoundComponent'
import PrivacyPolicy from '../components/PrivacyPolicy'
import AuthGuard from './auth-guard'

Vue.use(Router)

export const router = new Router({
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
        {
          path: '/privacy',
          component: PrivacyPolicy
        },
        //user account routes
        {
            path: '/account',
            component: Account,
            children: [
                {
                    path: 'courses',
                    component: Courses
                },
                {
                  path: 'education',
                  component: Education,
                  children: [
                      {
                          path: 'create',
                          component: EducationCreate
                      },
                      {
                          path: ':id',
                          component: EducationUpdate,
                          props: true
                      },
                      {
                          path: '',
                          component: EducationIndex
                      },
                  ],
                },
                {
                    path: 'experience',
                    component: Experience,
                    children: [
                        {
                            path: 'create',
                            component: ExperienceCreate
                        },
                        {
                            path: ':id',
                            component: ExperienceUpdate,
                            props: true
                        },
                        {
                            path: '',
                            component: ExperienceIndex
                        },
                    ]
                },
                {
                    path: '',
                    component: Profile
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