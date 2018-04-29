<template>
    <v-content>
        <v-container v-if="course" grid-list-md>
            <v-divider my-3></v-divider>
            <v-layout row wrap justify-center>
                <v-flex xs12 xl6>
                    <v-card height="100%">
                        <v-card-text>
                            <h1 class="py-4 grey--text text--darken-1">{{course.name}}</h1>
                            <div class="subheading"><strong>Type:</strong> {{course.type.name}}</div>
                            <div class="subheading mt-2"><strong>Author:</strong> <router-link :to="'/profile/' + user.id">{{user.name}}</router-link></div>
                            <div class="subheading my-2">Created on {{moment(course.created_at).format('LL')}}</div>
                            <div id="textPlaceholder"></div>
                            <v-chip :key="tag.id" v-for="tag in course.tags">{{tag.name}}</v-chip>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 xl6>
                    <v-card height="100%">
                        <v-card-text>
                            <h1 class="py-4 grey--text text--darken-1">Lessons</h1>
                            <!--<p v-for="course in userCourses">{{course.name}}</p>-->
                            <v-divider></v-divider>
                            <v-layout row wrap hidden-sm-and-down>
                                <v-flex>
                                    <div class="title grey--text text--darken-1">Lesson name</div>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row v-for="item in course.lessons" :key="item.id">
                                <v-flex xs12>
                                    <v-layout row >
                                        <v-flex xs12 md4>
                                            <div class="list-text">{{item.name}}</div>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 md4>
                                            <v-btn outline color="primary" router :to="'/lessons/' + item.id">
                                                View lesson
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                </v-flex>

                            </v-layout>
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
        name: "Course",
        props: ['id'],
        created() {
            this.description = this.course.description
        },
        data() {
            return {
                description: ''
            }
        },
        computed: {
            course() {
                let tutors = this.$store.getters.tutors
                let courses = []
                let vm = this
                tutors.forEach(function(e) {
                    courses = courses.concat(e.owned_courses.filter(function(c) {
                        return (c.id == vm.id);
                    }));
                });
               return courses[0]
            },
            user() {
                return this.$store.getters.tutors.find(tutor => tutor.id == this.course.user_id)
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