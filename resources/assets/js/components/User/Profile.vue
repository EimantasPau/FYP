<template>
    <v-container>
        <v-divider my-3></v-divider>
        <v-layout row>
            <v-flex>
                <h1 class=".headline text-md-center py-4 grey--text text--darken-1">{{profileUser.name}}'s profile
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-btn fab small color="light-blue accent-4" slot="activator"><v-icon color="white">edit</v-icon></v-btn>
                        <profile-update :user="profileUser" @updated="dialog = false"></profile-update>
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
            <v-flex md4 class="text-xs-center">
                <div class="headline">Eimantas Pauzuolis</div>
                <div class="subheading mt-2">eimantas.pauzuolis@gmail.com</div>
                <div class="subheading mt-2">Became a member on 23 April 2017</div>
            </v-flex>
        </v-layout>
        <v-divider class="my-3"></v-divider>
        <v-layout row wrap>
            <v-flex xs12>
                <h2 class="headline text-xs-center">Brief bio</h2>
                <blockquote class="blockquote">{{profileUser.bio}}</blockquote>
            </v-flex>
        </v-layout>
        <v-divider class="my-3"></v-divider>
        <v-layout row wrap>
            <v-flex md6 justify-center>
                <education></education>
            </v-flex>
            <v-flex md6>
              <experience></experience>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Education from './Education'
    import Experience from './Experience'
    import ProfileUpdate from './ProfileUpdate'
    export default {
        name: "Profile",
        data() {
          return {
              dialog: false
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
            Education,
            Experience,
            ProfileUpdate
        }
    }
</script>

<style scoped>

</style>