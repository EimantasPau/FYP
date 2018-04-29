<template>
    <v-content>
        <v-container v-if="lesson" grid-list-md>
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
                            <div class="subheading mt-2"><strong>Course:</strong> <router-link :to="'/courses/' + lesson.course_id">{{course.name}}</router-link></div>
                            <div id="textPlaceholder"></div>
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
                            <h1 class="py-4 grey--text text--darken-1">Ask a question</h1>
                            <v-text-field
                                    label="Your question"
                                    multi-line
                            ></v-text-field>
                            <v-btn outline>
                                Submit
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    let _ = require('lodash');
    export default {
        name: "Lesson",
        props: ['id'],
        created() {
            this.description = this.lesson.content
            this.course_id = this.lesson.course_id
        },
        data() {
            return {
                description: '',
                course_id: ''
            }
        },
        computed: {
            lesson() {
                let tutors = this.$store.getters.tutors
                let lessons = []
                tutors.forEach(tutor=> {
                    tutor.owned_courses.forEach(course=>{
                        lessons = lessons.concat(course.lessons.find(lesson=> {
                            return lesson.id == this.id
                        }))
                    })
                })
                return lessons[0]
            },
            course() {
                let tutors = this.$store.getters.tutors

                let courses = []
                tutors.forEach(tutor=> {
                    let course = tutor.owned_courses.find(course=> {
                        return course.id == this.course_id
                    })
                    if(course !== undefined){
                        courses = courses.concat(course)
                    }

                })
                console.log(courses)
                return courses[0]

            },
            videoPath() {
                return '/storage/' + this.lesson.file.file_path
            }
        },
        watch: {
            description(description){
                document.getElementById('textPlaceholder').innerHTML = description
            }
        }
    }

</script>

<style scoped>

</style>