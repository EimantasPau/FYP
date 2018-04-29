<template>
    <div>
        <v-layout row justify-center>
            <v-flex md6 class="text-xs-center">
                <v-progress-circular v-if="loading" indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
            </v-flex>
        </v-layout>
       <v-container grid-list-lg>
           <v-layout row wrap :key="chunk.name" v-for="chunk in chunkedItems" fill-height>
               <tutor-list-item :key="tutor.id" v-for="tutor in chunk" :id="tutor.id"></tutor-list-item>
           </v-layout>
       </v-container>
    </div>
</template>

<script>
    let _ = require('lodash');
    import TutorListItem from './TutorListItem'
    export default {
        name: "TutorList",
        props: ['tutors'],
        components: {TutorListItem},
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            chunkedItems () {
                return _.chunk(_.toArray(this.tutors), 2);
            }
        }
    }
</script>

<style scoped>

</style>