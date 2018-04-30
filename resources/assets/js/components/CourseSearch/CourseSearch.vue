<template>
    <v-content>
        <section>
            <v-parallax :src="require('../../../images/courses.jpeg')" height="300">
                <v-layout
                        class="white--text"
                        justify-center
                >
                    <v-flex lg6 style="background-color: rgba(28, 28, 28, 0.3);margin-top:20px;padding-top:50px;">
                        <h1 class="white--text mb-2 display-1 text-xs-center">Search for courses</h1>
                        <div class="subheading mb-3 text-xs-center">Find the best course for you!</div>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center style="margin-bottom:50px;">
                    <v-flex lg6>
                        <v-card>
                            <v-card-text>
                                <v-layout>
                                    <v-flex sm11>
                                        <v-text-field v-model="search" prepend-icon="search" hide-details single-line></v-text-field>
                                    </v-flex>
                                    <v-flex sm1 class="text-xs-center">
                                        <v-btn fab small class="grey darken-3 white--text">
                                            <v-icon>more_vert</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-parallax>
        </section>
        <v-container>

        </v-container>
        <v-container px-0>
            <course-list :courses="filteredCourses"></course-list>
        </v-container>
    </v-content>
</template>

<script>
    import CourseList from './CourseList'
    export default {
        name: "CourseSearch",
        components: {
            CourseList
        },
        methods: {

        },
        created(){
            this.$store.dispatch('getTutors')
        },
        data() {
            return {
                search: ''
            }
        },
        computed: {
            courses() {
                let courses = []
                if(this.$store.getters.tutors){
                    this.$store.getters.tutors.forEach(tutor => {
                        if(tutor.owned_courses){
                            courses = courses.concat(tutor.owned_courses)
                            console.log('Tutor course:' + tutor.owned_courses)
                        }
                    })
                }
                return courses
            },
            filteredCourses() {
                if (!this.search) {
                    return this.courses
                }
                return this.courses.filter(course => {
                    for(let i = 0; i<course.tags.length; i++){
                        // console.log(tutor.tags[i].name + ' search: ' + this.search)
                        if(course.tags[i].name.toLowerCase().includes(this.search.toLowerCase())){
                            return true
                        }
                    }
                    if(course.description.toLowerCase().includes(this.search.toLowerCase())){
                        return true
                    }
                    if(course.name.toLowerCase().includes(this.search.toLowerCase())){
                        return true
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>