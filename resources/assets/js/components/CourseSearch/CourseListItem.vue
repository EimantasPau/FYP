<template>
    <transition name="fade" mode="out-in">
        <v-flex xs12 xl6 v-if="course">
            <v-card height="100%">
                <v-card-text>
                    <h1 class="py-4 grey--text text--darken-1">{{course.name}}</h1>
                    <v-divider></v-divider>
                    <v-btn outline color="primary" router :to="'/courses/' + course.id">View course</v-btn>
                    <v-divider></v-divider>
                    <div class="subheading mt-2"><strong>Type:</strong> {{course.type.name}}</div>
                    <div class="subheading mt-2"><strong>Author:</strong> <router-link :to="'/profile/' + user.id">{{user.name}}</router-link></div>
                    <div class="subheading my-2">Created on {{moment(course.created_at).format('LL')}}</div>
                    <div :id="'textPlaceholder' + course.id"></div>
                    <v-chip :key="tag.id" v-for="tag in course.tags">{{tag.name}}</v-chip>
                </v-card-text>
            </v-card>
        </v-flex>
    </transition>
</template>

<script>
    export default {
        name: "CourseListItem",
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
                let courseItem = {}
                this.$store.getters.tutors.forEach(tutor => {
                    tutor.owned_courses.forEach(course =>{
                        if(course.id == this.id){
                            courseItem = course
                        }
                    })
                })
                return courseItem
            },
            user() {
                return this.$store.getters.tutors.find(tutor =>{
                    return tutor.owned_courses.find(course => course.id == this.id)
                })
            }
        },
        watch: {
            description(description){
                document.getElementById('textPlaceholder' + this.id).innerHTML = description
            }
        }
    }
</script>

<style scoped>

</style>