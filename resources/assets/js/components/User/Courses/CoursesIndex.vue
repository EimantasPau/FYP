<template>
    <v-container>
        <h2 class="display-1 grey--text text--darken-1">Your courses <v-btn router to="/account/courses/create" fab small color="light-blue accent-4"><v-icon medium color="white">add</v-icon ></v-btn></h2>
        <blockquote class="blockquote">Here are the courses that you've created.</blockquote>
        <blockquote v-if="courses.length <= 0" class="blockquote">You haven't created any courses yet.</blockquote>
        <v-layout row wrap class="mt-3" v-else v-for="item in courses" :key="item.id">
            <v-flex xs12>
                <v-alert outline color="blue lighten-3" value="true">
                    <v-layout row wrap>
                        <v-flex xs12 lg3>
                            <div class="grey--text text--darken-1">Name</div><div style="word-wrap: break-word;" class="subheading">{{item.name}}</div>
                        </v-flex>
                        <v-flex xs12 lg3>
                            <div class="grey--text text--darken-1">Type</div><div style="word-wrap: break-word;" class="subheading">{{item.type.name}}</div>
                        </v-flex>
                        <v-flex xs12 lg3>
                            <div class="grey--text text--darken-1">Status</div><div style="word-wrap: break-word;" class="subheading">{{item.status.name}}</div>
                        </v-flex>
                        <v-flex xs12 lg3>
                            <v-btn flat icon color="light-blue accent-4" router :to="'/account/courses/' + item.id">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon color="pink" @click="onDelete(item)">
                                <v-icon>delete_forever</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "CoursesIndex",
        computed: {
            courses() {
                return this.$store.getters.user.owned_courses
            }
        },
        methods: {
            onDelete(course) {
                this.$store.dispatch('deleteCourse', course)
            }
        }
    }
</script>

<style scoped>

</style>