<template>
    <v-content>
        <v-container v-if="lesson != null || lesson != undefined" grid-list-md>
            <v-divider my-3></v-divider>
            <v-layout row wrap justify-center>
                <v-flex xs12 xl6>
                    <v-card height="100%">
                        <v-card-text>
                            <h1 class="py-4 grey--text text--darken-1">{{lesson.name}}</h1>
                            <video width="100%" height="auto" controls v-if="lesson.file">
                                <source :src="videoPath" type="video/mp4">
                                <source :src="videoPath" type="video/ogg">
                                Your browser does not support the video tag.
                            </video>
                            <div v-if="course" class="subheading mt-2"><strong>Course:</strong> <router-link :to="'/courses/' + lesson.course_id">{{course.name}}</router-link></div>
                            <div v-html="lesson.content"></div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container v-if="lesson" grid-list-md>
            <v-layout row wrap justify-center>
                <v-flex xs12 xl6>
                    <v-card height="100%">
                        <v-card-text>
                            <transition name="fade" mode="out-in">
                                <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
                            </transition>
                            <v-form>
                                <h1 class="py-4 grey--text text--darken-1">Ask a question</h1>
                                <v-text-field
                                        label="Your question"
                                        multi-line
                                        v-model="question"
                                ></v-text-field>
                                <v-btn outline @click="onQuestionSubmit">
                                    Submit
                                </v-btn>
                            </v-form>
                            <h1 class="py-4 grey--text text--darken-1">Questions</h1>
                            <v-divider></v-divider>
                            <blockquote v-if="questions.length <= 0" class="blockquote">No questions.</blockquote>
                            <v-layout row wrap :key="question.id" v-for="question in questions">

                                <v-list three-line>
                                    <v-list-tile avatar>
                                       <v-list-tile-avatar>
                                           <img :src="question.user.file ? '/storage/' + question.user.file.file_path : '/images/default-profile.png'" alt="">
                                       </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <div class="body-2"> {{question.user.name}}</div>
                                            <div class="body-2"> Asked on {{moment(question.created_at).format('LL')}}</div>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <div class="subheading">{{question.body}}</div>
                                </v-list>

                               <!--<v-flex xs12>-->
                                   <!--<v-avatar-->
                                           <!--:size="70"-->
                                           <!--class="grey lighten-4"-->
                                   <!--&gt;-->
                                       <!--<img :src="question.user.file ? '/storage/' + question.user.file.file_path : '/images/default-profile.png'" alt="avatar">-->
                                   <!--</v-avatar>-->
                               <!--</v-flex>-->
                               <!--<v-flex xs12 justify-conten-center align-items-center>-->
                                  <!--<div class="body-2"> {{question.user.name}}</div>-->
                                  <!--<div class="body-2"> Asked on {{moment(question.created_at).format('LL')}}</div>-->
                               <!--</v-flex>-->
                               <!--<v-flex xs12>-->
                                   <!--<div class="subheading">{{question.body}}</div>-->
                               <!--</v-flex>-->
                            </v-layout>
                            <v-divider></v-divider>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import axios from 'axios'
    let _ = require('lodash');
    export default {
        name: "Lesson",
        props: ['id'],
        created() {
            let token = localStorage.getItem('token')
            axios.post('/api/lessons/search?lesson_id=' + this.id + '&token=' + token)
                .then(response => {
                    this.lesson = response.data.lesson
                    let token = localStorage.getItem('token')
                    axios.post('/api/courses/search?course_id=' + this.lesson.course_id + '&token=' + token)
                        .then(response => {
                            this.course = response.data.course
                        })
                })

        },
        mounted(){

            let token = localStorage.getItem('token')
            axios.get('/api/questions?lesson_id='+ this.id +'&token=' + token)
                .then(response => {
                    console.log(JSON.stringify(response.data))
                    this.questions = response.data.questions
                })
                .catch(errors => {
                    console.log(errors.response.data)
                })

        },
        data() {
            return {
                description: '',
                course: null,
                question: '',
                questions: [],
                lesson: null
            }
        },
        methods: {
            onQuestionSubmit(){
                let formData = {
                    body: this.question,
                    lesson_id: this.id
                }
                this.question = ''
                this.$store.dispatch('clearError', 'questionCreate')
                let token = localStorage.getItem('token')
                axios.post('/api/questions?token=' + token, formData)
                    .then(response => {
                        console.log(response.data.question)
                        this.questions.unshift(response.data.question[0])
                    })
                    .catch(errors => {
                        console.log('setting error')
                        let payload = {
                            form: 'questionCreate',
                            errors : errors.response.data.errors
                        }
                        this.$store.dispatch('setError', payload)
                    })
            },
            onDismissed() {
                this.$store.dispatch('clearError','questionCreate')
            },
        },
        computed: {
            videoPath() {
                return '/storage/' + this.lesson.file.file_path
            },
            errors() {
                return this.$store.getters.errors.questionCreate;
            }
        }
    }

</script>

<style scoped>

</style>