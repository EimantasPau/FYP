<template>
    <v-content>
        <section>
            <!--<v-parallax :src="require('../../../images/tutor.jpg')" height="300">-->
                <!--<v-layout-->
                        <!--column-->
                        <!--align-center-->
                        <!--justify-center-->

                <!--&gt;-->
                    <!--<div style="background-color: rgba(28, 28, 28, 0.3);padding: 30px 100px;">-->
                        <!--<h1 class="white&#45;&#45;text mb-2 display-1 text-xs-center">Tutor search</h1>-->
                        <!--<div class="subheading mb-3 text-xs-center">Find the best teacher for you!</div>-->
                    <!--</div>-->
                <!--</v-layout>-->
            <!--</v-parallax>-->
            <v-parallax :src="require('../../../images/tutor.jpg')" height="400">
                <v-layout
                        column
                        align-center
                        justify-center
                        class="white--text"
                >
                    <!--<img src="../../images/vuetify.png" alt="Vuetify.js" height="200">-->
                    <div style="background-color: rgba(28, 28, 28, 0.5);padding: 30px 100px;">
                        <h1 class="white--text mb-2 display-1 text-xs-center">Tutor search</h1>
                        <div class="subheading mb-3 text-xs-center">Find the best suited teacher for you!</div>
                    </div>
                </v-layout>
            </v-parallax>
        </section>
        <v-container>
            <v-layout row justify-center>
                <v-flex xs12 xl6>
                    <v-card>
                        <v-card-text>
                            <v-layout>
                                <v-flex sm11>
                                    <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
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
        </v-container>
        <v-container>
            <tutor-list></tutor-list>
        </v-container>
    </v-content>
</template>

<script>
    import TutorList from './TutorList'
    export default {
        name: "Tutor search",
        components: {
            TutorList
        },
        methods: {

        },
        created() {

        }
    }
</script>

<style scoped>

</style>