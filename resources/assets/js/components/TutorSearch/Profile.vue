<template>
    <v-content>
        <v-container v-if="profileUser" grid-list-md>
            <v-divider my-3></v-divider>
            <v-layout row>
                <v-flex>
                    <h1 class="text-xs-center py-4 grey--text text--darken-1">{{profileUser.name}}'s profile
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
            <v-layout class="mb-3" justify-center>
                <v-btn outline color="primary" @click="currentTab = 'profile-info'">User details</v-btn>
                <v-btn outline color="deep-purple accent-1"  @click="currentTab = 'tutor-courses-info'">Courses</v-btn>
                <v-btn outline color="deep-purple accent-1" @click="startConversation">Start conversation</v-btn>
            </v-layout>
            <transition name="fade" mode="out-in">
                <component :is="currentTab" :id="id"></component>
            </transition>
        </v-container>
    </v-content>
</template>

<script>
    import ProfileInfo from './ProfileInfo'
    import TutorCoursesInfo from './TutorCoursesInfo'
    import axios from 'axios'
    export default {
        name: "TutorProfile",
        props: ['id'],
        data() {
            return {
                currentTab: 'profile-info'
            }
        },
        created() {
          if(!this.profileUser){
              this.$router.push('/tutors')
          }
        },
        computed: {
            profileUser() {
                return this.$store.getters.tutors.find(tutor => tutor.id == this.id)
            },
            profileImage() {
                return this.profileUser.file ? '/storage/' +this.profileUser.file.file_path : '/images/default-profile.png'
            }
        },
        methods: {
            startConversation() {
                let formData = {
                    user_id: this.profileUser.id
                };
                this.$store.dispatch('startConversation', formData)
            }
        },
        components:{
            ProfileInfo,
            TutorCoursesInfo
        }
    }
</script>

<style scoped>

</style>