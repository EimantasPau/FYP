<template>
    <v-container px-0 mx-0>
        <h2 class="display-1 grey--text text--darken-1"><v-btn fab small color="primary" router to="/account/courses"><v-icon medium color="white">arrow_back</v-icon ></v-btn>Lessons <v-btn router :to="'/account/courses/' + id +'/lessons/create'" fab small color="light-blue accent-4"><v-icon medium color="white">add</v-icon ></v-btn></h2>
        <blockquote class="blockquote">Here are the lessons for the course.</blockquote>
        <template v-if="lessons.length > 0">
            <v-divider></v-divider>
            <v-layout row wrap hidden-sm-and-down>
                <v-flex xs4 lg3>
                    <div class="title grey--text text--darken-1">Lesson title</div>
                </v-flex>
                <v-flex xs4 lg3>
                    <div class="title grey--text text--darken-1">Created</div>
                </v-flex>
                <v-flex xs4 lg3>
                    <div class="title grey--text text--darken-1">Last updated</div>
                </v-flex>
            </v-layout>
        </template>
        <v-divider></v-divider>

        <blockquote v-if="lessons.length <= 0" class="blockquote">You haven't created any courses yet.</blockquote>
        <v-layout row wrap v-else v-for="item in lessons" :key="item.id">
            <v-flex xs12>
                <v-layout row wrap>
                    <v-flex xs12 md3>
                        <div style="word-wrap: break-word;" class="list-text">{{item.name}}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <div style="word-wrap: break-word;" class="list-text">{{moment(item.created_at).format('LL')}}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <div style="word-wrap: break-word;" class="list-text">{{moment(item.updated_at).format('LL')}}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-btn flat icon color="light-blue accent-4" router :to="'/account/courses/' + item.course_id + '/lessons/' + item.id + '/update'">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink" @click="onDelete(item)">
                            <v-icon>delete_forever</v-icon>
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
        name: "Lessons",
        props:['id'],
        computed: {
            lessons() {
                let course = this.$store.getters.user.owned_courses.find(course => {
                    return course.id == this.id;
                })
                return course.lessons
            }
        },
        methods: {
            onDelete(lesson) {
                this.$store.dispatch('deleteLesson', lesson)
            }
        }
    }
</script>

<style scoped>

</style>