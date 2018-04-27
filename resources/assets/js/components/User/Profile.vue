<template>
   <v-content>
       <v-container px-0 v-if="this.$store.getters.user">
           <v-divider my-3></v-divider>
           <v-layout row>
               <v-flex>
                   <h1 class="text-xs-center py-4 grey--text text--darken-1">{{profileUser.name}}'s profile
                       <v-dialog persistent v-model="updateDialog" max-width="500px">
                           <v-btn fab small color="light-blue accent-4" @click="setVisible" slot="activator"><v-icon color="white">edit</v-icon></v-btn>
                           <profile-update :user="profileUser" @updated="canClose"></profile-update>
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
                   <div class="headline">{{profileUser.name}}</div>
                   <div class="subheading mt-2">{{profileUser.email}}</div>
                   <div class="subheading mt-2">Member since {{moment(profileUser.created_at).format('LL')}}</div>
               </v-flex>
           </v-layout>
           <v-divider class="my-3"></v-divider>
           <v-layout row wrap>
               <v-flex lg6>
                   <h2 class="headline">Brief bio</h2>
                   <blockquote class="blockquote">{{profileUser.bio}}</blockquote>
               </v-flex>
               <v-flex lg6>
                   <skills></skills>
               </v-flex>
           </v-layout>


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

          }
        },
        computed: {
            profileUser() {
                return this.$store.getters.user
            },
            profileImage() {
                return this.$store.getters.user.file ? this.profileUser.file.file_path : '/images/default-profile.png'
            },
            updateDialog() {
            return this.$store.getters.isDisplaying.updateDialog
            }
        },
        methods: {
            canClose() {
                if(!this.$store.getters.errors.basicInfo){
                    let payload = {
                        form: 'updateDialog',
                        isDisplaying: false
                    }
                    this.$store.dispatch('setDisplaying', payload)
                }
            },
            setVisible() {
                let payload = {
                    form: 'updateDialog',
                    isDisplaying: true
                }
                this.$store.dispatch('setDisplaying', payload)
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