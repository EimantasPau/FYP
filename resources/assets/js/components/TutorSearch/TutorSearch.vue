<template>
    <v-content>
        <section>
            <v-parallax :src="require('../../../images/tutor.jpg')" height="300">
                <v-layout
                        class="white--text"
                        justify-center
                >
                    <v-flex lg6 style="background-color: rgba(28, 28, 28, 0.3);margin-top:20px;padding-top:50px;">
                            <h1 class="white--text mb-2 display-1 text-xs-center">Search for tutors</h1>
                            <div class="subheading mb-3 text-xs-center">Find the best suited teacher for you!</div>
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
            <tutor-list :tutors="filteredTutors"></tutor-list>
        </v-container>
    </v-content>
</template>

<script>
    import { stickyDirective } from 'vue-sticky-js';
    import VueSticky from 'vue-sticky'
    import TutorList from './TutorList'
    export default {
        name: "TutorSearch",
        components: {
            TutorList
        },
        directives: {
            'sticky': VueSticky
        },
        mounted(){

        },
        methods: {

        },
        created(){
            this.$store.dispatch('getTutors')
        },
        data() {
            return {
                stickyOptions: {
                    marginTop: 20
                },
                search: ''
            }
        },
        computed: {
            tutors() {
                return this.$store.getters.tutors
            },
            filteredTutors() {
                if (!this.search) {
                    return this.tutors
                }
                return this.tutors.filter(tutor => {
                    for(let i = 0; i<tutor.skills.length; i++){
                        console.log(tutor.skills[i].name + ' search: ' + this.search)
                        if(tutor.skills[i].name.toLowerCase().includes(this.search.toLowerCase())){
                            return true
                        }
                    }
                    if(tutor.bio.toLowerCase().includes(this.search.toLowerCase())){
                        return true
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>