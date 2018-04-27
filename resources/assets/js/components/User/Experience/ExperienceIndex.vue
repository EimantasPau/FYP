<template>
    <v-container px-0>
        <h1 class="display-1 grey--text text--darken-1">Experience <v-btn fab small color="light-blue accent-4" router to="/account/experience/create"><v-icon medium color="white">add</v-icon ></v-btn></h1>
        <blockquote class="blockquote">Add previous or current work experience.</blockquote>
        <blockquote v-if="experience.length <= 0" class="blockquote">You currently haven't added any experience.</blockquote>
        <v-layout row wrap class="mt-3" v-else v-for="item in experience" :key="item.id">
            <v-flex xs12>
                <v-alert outline color="blue lighten-3" value="true">
                    <v-content>
                        <v-layout row wrap>
                            <v-flex xs12 lg2>
                                <div class="grey--text text--darken-1">Name</div><div style="word-wrap: break-word;" class="subheading">{{item.name}}</div>
                            </v-flex>
                            <v-flex xs12 lg2>
                                <div class="grey--text text--darken-1">Company/Institution</div><div style="word-wrap: break-word;" class="subheading">{{item.institution}}</div>
                            </v-flex>
                            <v-flex xs12 lg2>
                                <div class="grey--text text--darken-1">Responsibilities</div><div style="word-wrap: break-word;" class="subheading">{{item.description}}</div>
                            </v-flex>
                            <v-flex xs12 lg2>
                                <div class="grey--text text--darken-1">Starting date </div><div class="subheading">{{item.started_on}}</div>
                            </v-flex>
                            <v-flex xs12 lg2>
                                <div class="grey--text text--darken-1">Finishing date</div><div class="subheading">{{item.finished_on ? item.finished_on : 'Ongoing'}}</div>
                            </v-flex>
                            <v-flex xs12 lg2>
                                <v-btn flat icon color="light-blue accent-4" router :to="'/account/experience/' + item.id">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn flat icon color="pink" @click="onDelete(item)">
                                    <v-icon>delete_forever</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-content>
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "ExperienceIndex",
        computed: {
            experience() {
                return this.$store.getters.user.experience
            }
        },
        methods: {
            onDelete(experience) {
                this.$store.dispatch('deleteExperience', experience)
            }
        }
    }
</script>

<style scoped>

</style>