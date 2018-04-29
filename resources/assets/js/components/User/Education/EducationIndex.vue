<template>
    <v-container px-0>
        <h1 class="display-1 grey--text text--darken-1">Education <v-btn fab small color="success" router to="/account/education/create"><v-icon medium color="white">add</v-icon ></v-btn></h1>
        <blockquote class="blockquote">Add your education or training that you did.</blockquote>
        <blockquote v-if="education.length <= 0" class="blockquote">You currently haven't added any education.</blockquote>
        <v-layout row wrap class="mt-3" v-else v-for="item in education" :key="item.id">
            <v-flex xs12>
                <v-alert outline color="green lighten-3" value="true">
                    <v-layout row wrap>
                        <v-flex xs12 lg2>
                            <div class="grey--text text--darken-1">Course/Degree</div><div style="word-wrap: break-word;" class="subheading">{{item.name}}</div>
                        </v-flex>
                        <v-flex xs12 lg2>
                            <div class="grey--text text--darken-1">School/University</div><div style="word-wrap: break-word;" class="subheading">{{item.institution}}</div>
                        </v-flex>
                        <v-flex xs12 lg2>
                            <div class="grey--text text--darken-1">Type </div><div style="word-wrap: break-word;" class="subheading">{{item.classification}}</div>
                        </v-flex>
                        <v-flex xs12 lg2>
                            <div class="grey--text text--darken-1">Starting date </div><div class="subheading">{{item.started_on}}</div>
                        </v-flex>
                        <v-flex xs12 lg2>
                            <div class="grey--text text--darken-1">Finishing date</div><div class="subheading">{{item.finished_on ? item.finished_on : 'Ongoing'}}</div>
                        </v-flex>
                        <v-flex xs12 lg2>
                            <v-btn flat icon color="light-blue accent-4" router :to="'/account/education/' + item.id">
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
        name: "EducationIndex",
        computed: {
            education() {
                return this.$store.getters.user.education
            }
        },
        methods: {
            onDelete(education) {
                this.$store.dispatch('deleteEducation', education)
            }
        }
    }
</script>

<style scoped>

</style>