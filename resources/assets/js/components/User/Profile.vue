<template>
   <v-content>
       <v-container v-if="this.$store.getters.user">
           <v-divider my-3></v-divider>
           <v-layout row>
               <v-flex>
                   <h1 class="text-xs-center py-4 grey--text text--darken-1">{{profileUser.name}}'s profile
                       <v-dialog v-model="updateDialog" max-width="500px">
                           <v-btn fab small color="light-blue accent-4" slot="activator"><v-icon color="white">edit</v-icon></v-btn>
                           <profile-update :user="profileUser" @updated="updateDialog = false"></profile-update>
                       </v-dialog>
                   </h1>
               </v-flex>
           </v-layout>
           <v-layout row justify-center>
               <v-avatar
                       :tile="false"
                       :size="200"
                       class="grey lighten-4 text-xs-center d-block my-3">
                   <img :src="profileImage" alt="avatar">
               </v-avatar>
           </v-layout>
           <v-layout row justify-center>
               <v-flex class="text-xs-center">
                   <div class="headline">Eimantas Pauzuolis</div>
                   <div class="subheading mt-2">eimantas.pauzuolis@gmail.com</div>
                   <div class="subheading mt-2">Became a member on 23 April 2017</div>
               </v-flex>
           </v-layout>
           <v-divider class="my-3"></v-divider>
           <v-layout row wrap>
               <v-flex xs12>
                   <h2 class="headline">Brief bio</h2>
                   <blockquote class="blockquote">{{profileUser.bio}}</blockquote>
               </v-flex>
           </v-layout>
           <v-divider class="my-3"></v-divider>
           <skills></skills>
       </v-container>
   </v-content>
</template>

<script>
    import ProfileUpdate from './ProfileUpdate'
    import Skills from './Skills'
    export default {
        name: "Profile",
        data() {
          return {
              updateDialog: false,
          }
        },
        computed: {
            profileUser() {
                return this.$store.getters.user
            },
            profileImage() {
                return this.$store.getters.user.file ? this.profileUser.file.file_path : '/images/default-profile.png'
            }
        },
        components: {
            ProfileUpdate,
            Skills
        }
    }
</script>

<style scoped>

</style>