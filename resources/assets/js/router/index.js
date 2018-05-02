import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
//auth components
import Signup from '../components/Signup'
import Signin from '../components/Signin'
//account components
import Account from '../components/User/Account'

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
//courses components
import Courses from '../components/User/Courses/Courses'
import CoursesCreate from '../components/User/Courses/CoursesCreate'
import CoursesIndex from '../components/User/Courses/CoursesIndex'
import CoursesUpdate from '../components/User/Courses/CoursesUpdate'

import LessonsIndex from '../components/User/Lessons/LessonsIndex'
import LessonsCreate from '../components/User/Lessons/LessonsCreate'
import LessonsUpdate from '../components/User/Lessons/LessonsUpdate'

import TutorSearch from '../components/TutorSearch/TutorSearch'
import TutorProfile from '../components/TutorSearch/Profile'

import CourseSearch from '../components/CourseSearch/CourseSearch'

import Course from '../components/Course'
import Lesson from '../components/Lesson'
import Groups from '../components/Groups'
import Conversation from '../components/Conversation'
Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/profile/:id',
            component: TutorProfile,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            path: '/tutors',
            component: TutorSearch,
            name: 'Tutors',
            beforeEnter: AuthGuard
        },
        {
            path: '/conversations',
            component: Groups,
            beforeEnter: AuthGuard,
            children: [
                {
                    path: ':id',
                    component: Conversation,
                    props: true,
                    beforeEnter: AuthGuard
                }
            ]
        },
        {
            path: '/courses',
            component: CourseSearch,
            beforeEnter: AuthGuard
        },
        {
            path: '/courses/:id',
            component: Course,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            path: '/lessons/:id',
            component: Lesson,
            props: true,
            beforeEnter: AuthGuard
        },
        {
          path: '/privacy',
          component: PrivacyPolicy
        },
        //user account routes
        {
            path: '/account',
            component: Account,
            beforeEnter: AuthGuard,
            children: [
                {
                    path: 'courses',
                    component: Courses,
                    beforeEnter: AuthGuard,
                    children: [
                        {
                            path: 'create',
                            component: CoursesCreate,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: ':id/update',
                            component: CoursesUpdate,
                            props: true,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: '',
                            component: CoursesIndex,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: ':id/lessons',
                            component: LessonsIndex,
                            props: true,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: ':id/lessons/create',
                            component: LessonsCreate,
                            props: true,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: ':id/lessons/:lesson_id/update',
                            component: LessonsUpdate,
                            props: true,
                            beforeEnter: AuthGuard,
                        },

                    ]
                },
                {
                  path: 'education',
                  component: Education,
                    beforeEnter: AuthGuard,
                  children: [
                      {
                          path: 'create',
                          component: EducationCreate,
                          beforeEnter: AuthGuard,
                      },
                      {
                          path: ':id',
                          component: EducationUpdate,
                          props: true,
                          beforeEnter: AuthGuard,
                      },
                      {
                          path: '',
                          component: EducationIndex,
                          beforeEnter: AuthGuard,
                      },
                  ],
                },
                {
                    path: 'experience',
                    component: Experience,
                    beforeEnter: AuthGuard,
                    children: [
                        {
                            path: 'create',
                            component: ExperienceCreate,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: ':id',
                            component: ExperienceUpdate,
                            props: true,
                            beforeEnter: AuthGuard,
                        },
                        {
                            path: '',
                            component: ExperienceIndex,
                            beforeEnter: AuthGuard,
                        },
                    ]
                },
                {
                    path: 'lessons'
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