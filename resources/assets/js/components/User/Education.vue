<template>
    <v-container>
        <h1 class="display-1 grey--text text--darken-1">Education <v-btn fab small color="success"><v-icon medium color="white">add</v-icon ></v-btn></h1>
        <v-layout row wrap class="mt-3">
           <v-flex xs12>
               <v-alert outline color="success" value="true">
                   <v-layout row justify-end>
                       <v-btn flat icon color="light-blue accent-4">
                           <v-icon>edit</v-icon>
                       </v-btn>
                       <v-btn flat icon color="pink">
                           <v-icon>delete_forever</v-icon>
                       </v-btn>
                   </v-layout>
                   <v-layout row wrap>
                       <v-flex xs12 md3>
                           <div class="grey--text text--darken-1">Institution:</div><div class="subheading">University of Huddersfield</div>
                       </v-flex>
                       <v-flex xs12 md3>
                           <div class="grey--text text--darken-1">Classification: </div><div class="subheading">BEng(Honours)</div>
                       </v-flex>
                       <v-flex xs12 md3>
                           <div class="grey--text text--darken-1">Starting date: </div><div class="subheading">April 21 2013</div>
                       </v-flex>
                       <v-flex xs12 md3>
                           <div class="grey--text text--darken-1">Finishing date:</div><div class="subheading">July 16 2017</div>
                       </v-flex>
                   </v-layout>
               </v-alert>
           </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-3">
            <v-flex xs12>
                <v-alert outline color="success" value="true">
                    <v-layout row justify-end>
                        <v-btn flat icon color="light-blue accent-4">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink">
                            <v-icon>delete_forever</v-icon>
                        </v-btn>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 md3>
                            <div class="grey--text text--darken-1">Institution:</div><div class="subheading">Utena Adolfas Sapoka Gymnasium</div>
                        </v-flex>
                        <v-flex xs12 md3>
                            <div class="grey--text text--darken-1">Classification: </div><div class="subheading">GCSE</div>
                        </v-flex>
                        <v-flex xs12 md3>
                            <div class="grey--text text--darken-1">Starting date: </div><div class="subheading">April 21 2009</div>
                        </v-flex>
                        <v-flex xs12 md3>
                            <div class="grey--text text--darken-1">Finishing date:</div><div class="subheading">July 16 2013</div>
                        </v-flex>
                    </v-layout>
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Education"
    }
</script>

<style scoped>

</style>