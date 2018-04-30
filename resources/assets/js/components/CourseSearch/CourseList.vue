<template>
    <div>
        <v-layout row v-if="chunkedItems.length <= 0 && courses != undefined">
            <v-alert outline color="error" value="true">
                <blockquote class="blockquote">There are no courses available at this time.</blockquote>
            </v-alert>
        </v-layout>
        <v-layout row justify-center>
            <v-flex md6 class="text-xs-center">
                <v-progress-circular v-if="loading" indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-container grid-list-lg>
            <v-layout row wrap :key="chunk.name" v-for="chunk in chunkedItems" fill-height>
                <course-list-item :key="course.id" v-for="course in chunk" :id="course.id"></course-list-item>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    let _ = require('lodash');
    import CourseListItem from './CourseListItem'
    export default {
        name: "CourseList",
        props: ['courses'],
        components: {CourseListItem},
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
                return _.chunk(_.toArray(this.courses), 2);
            }
        }
    }
</script>

<style scoped>

</style>