<template>
    <v-container px-0 mx-0 v-if="courses">
        <h2 class="display-1 grey--text text--darken-1">Your courses <v-btn router to="/account/courses/create" fab small color="light-blue accent-4"><v-icon medium color="white">add</v-icon ></v-btn></h2>
        <blockquote class="blockquote">Here are the courses that you've created.</blockquote>
        <template v-if="courses.length > 0">
            <v-divider></v-divider>
            <v-layout row wrap hidden-sm-only>
                <v-flex xs3>
                    <div class="title grey--text text--darken-1">Name</div>
                </v-flex>
                <v-flex xs3>
                    <div class="title grey--text text--darken-1">Type</div>
                </v-flex>
                <v-flex xs3>
                    <div class="title grey--text text--darken-1">Status</div>
                </v-flex>
                <v-flex xs3></v-flex>
            </v-layout>
            <v-divider></v-divider>
        </template>
        <blockquote v-else class="blockquote">You haven't created any courses yet.</blockquote>
        <v-layout row v-for="item in courses" :key="item.id">
            <v-flex xs12>
                <v-layout row >
                    <v-flex xs12 md3>
                        <div class="list-text">{{item.name}}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <div class="list-text">{{item.type.name}}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <div class="list-text">{{item.status.name}}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-btn flat icon color="light-blue accent-4" router :to="'/account/courses/' + item.id + '/update/'">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink" @click="onDelete(item)">
                            <v-icon>delete_forever</v-icon>
                        </v-btn>
                        <v-btn v-if="item.type_id !== 3" outline color="primary" router :to="'/account/courses/' + item.id + '/lessons'">
                            <v-icon>list</v-icon>
                            Lessons
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
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