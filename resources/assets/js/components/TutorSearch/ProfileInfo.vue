<template>
    <div>
        <v-layout row wrap>
            <v-flex lg6>
                <v-card height="100%">
                    <v-card-text>
                        <h2 class="text-xs-center grey--text text--darken-1">Brief bio</h2>
                        <v-divider></v-divider>
                        <blockquote class="subheading mt-3 text-md-center">{{profileUser.bio}}</blockquote>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex lg6>
                <v-card height="100%">
                    <v-card-text>
                        <h2 class="text-xs-center grey--text text--darken-1">Skills or area of knowledge</h2>
                        <v-divider></v-divider>
                        <blockquote v-if="profileUser.skills.length < 1" class="blockquote text-md-center">This user has not added any skills.</blockquote>
                        <div class="mt-3 text-md-center">
                            <v-chip :key="skill.id" v-for="skill in profileUser.skills">{{skill.name}}</v-chip>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex lg6>
                <v-card height="100%">
                    <v-card-text>
                        <h2 class="text-xs-center grey--text text--darken-1">Education</h2>
                        <v-divider></v-divider>
                        <blockquote v-if="profileUser.education.length < 1" class="blockquote">This user has not added any education.</blockquote>
                        <v-layout row wrap class="mt-3" v-for="item in profileUser.education" :key="item.id">
                            <v-flex xs12>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <div class="grey--text text--darken-1">Degree/Course</div><div style="word-wrap: break-word;" class="subheading">{{item.name}}</div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <div class="grey--text text--darken-1">School/University</div><div style="word-wrap: break-word;" class="subheading">{{item.institution}}</div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <div class="grey--text text--darken-1">Type </div><div style="word-wrap: break-word;" class="subheading">{{item.classification}}</div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <div class="grey--text text--darken-1">Starting date </div><div class="subheading">{{item.started_on}}</div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <div class="grey--text text--darken-1">Finishing date</div><div class="subheading">{{item.finished_on ? item.finished_on : 'Ongoing'}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex lg6>
                <v-card height="100%">
                    <v-card-text>
                        <h2 class="text-xs-center grey--text text--darken-1">Experience</h2>
                        <v-divider></v-divider>
                        <blockquote v-if="profileUser.experience.length < 1" class="blockquote">This user has not added any work experience.</blockquote>
                        <v-layout row wrap class="mt-3" v-else v-for="item in profileUser.experience" :key="item.id">
                            <v-flex xs12>
                                <v-content>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <div class="grey--text text--darken-1">Name</div><div style="word-wrap: break-word;" class="subheading">{{item.name}}</div>
                                        </v-flex>
                                        <v-flex xs12>
                                            <div class="grey--text text--darken-1">Company/Institution</div><div style="word-wrap: break-word;" class="subheading">{{item.institution}}</div>
                                        </v-flex>
                                        <v-flex xs12>
                                            <div class="grey--text text--darken-1">Responsibilities</div><div style="word-wrap: break-word;" class="subheading">{{item.description}}</div>
                                        </v-flex>
                                        <v-flex xs12>
                                            <div class="grey--text text--darken-1">Starting date </div><div class="subheading">{{item.started_on}}</div>
                                        </v-flex>
                                        <v-flex xs12>
                                            <div class="grey--text text--darken-1">Finishing date</div><div class="subheading">{{item.finished_on ? item.finished_on : 'Ongoing'}}</div>
                                        </v-flex>
                                    </v-layout>
                                </v-content>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "ProfileInfo",
        props: ['id'],
        computed:{
            profileUser() {
                return this.$store.getters.tutors.find(tutor => tutor.id == this.id)
            },
        }
    }
</script>

<style scoped>

</style>