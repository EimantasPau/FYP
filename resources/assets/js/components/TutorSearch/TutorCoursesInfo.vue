<template>
   <v-layout row wrap justify-center>
       <v-flex xl6>
           <v-card height="100%">
               <v-card-text>
                   <h2 class="text-xs-center grey--text text--darken-1">User's courses</h2>
                  <template v-if="userCourses.length < 1" >
                      <v-divider></v-divider>
                      <blockquote class="blockquote">This user has not created any courses</blockquote>
                  </template>
                   <!--<p v-for="course in userCourses">{{course.name}}</p>-->
                   <template v-if="userCourses.length > 0">
                       <v-divider></v-divider>
                       <v-layout row wrap hidden-sm-and-down>
                           <v-flex xs4>
                               <div class="title grey--text text--darken-1">Name</div>
                           </v-flex>
                           <v-flex xs4>
                               <div class="title grey--text text--darken-1">Type</div>
                           </v-flex>
                           <v-flex xs4></v-flex>
                       </v-layout>
                       <v-divider></v-divider>
                   </template>

                   <v-layout row v-for="item in userCourses" :key="item.id">
                       <v-flex xs12>
                           <v-layout row >
                               <v-flex xs12 md4>
                                   <div class="list-text">{{item.name}}</div>
                               </v-flex>
                               <v-flex xs12 md4>
                                   <div class="list-text">{{item.type.name}}</div>
                               </v-flex>
                               <v-flex xs12 md4>
                                   <v-btn outline color="primary" router :to="'/courses/' + item.id">
                                       <v-icon>list</v-icon>
                                       View course
                                   </v-btn>
                               </v-flex>
                           </v-layout>
                           <v-divider></v-divider>
                       </v-flex>

                   </v-layout>
               </v-card-text>
           </v-card>
       </v-flex>
   </v-layout>
</template>

<script>
    export default {
        name: "TutorCoursesInfo",
        props:['id'],
        computed:{
            userCourses() {
                return this.$store.getters.tutors.find(user => user.id == this.id).owned_courses
            }
        }
    }
</script>

<style scoped>

</style>