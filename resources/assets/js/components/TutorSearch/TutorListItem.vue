<template>
    <transition name="fade" mode="out-in">
        <v-flex sm12 lg6>
            <v-card height="100%" style="padding: 20px;">
                <v-card-actions>
                    <v-layout row wrap>
                        <v-flex>
                            <div class="headline">{{tutor.name}}</div>
                        </v-flex>
                        <v-flex>
                            <v-btn flat color="primary" router :to="'/profile/' + id">View profile</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
                <v-card-text>
                    <v-layout row wrap fill-height>
                        <v-flex md4>
                            <v-avatar
                                    :size="150"
                                    class="grey lighten-4"
                            >
                                <img :src="profileImage" alt="avatar">
                            </v-avatar>
                        </v-flex>
                        <v-flex md8>
                            <div class="body-3">{{tutor.bio}}</div>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap v-if="tutor.skills.length > 0">
                        <v-flex xs12>
                            <div class="subheading"><strong>Teaching areas or skills</strong></div>
                        </v-flex>
                        <v-flex xs12>
                            <v-chip :key="skill.id" v-for="skill in tutor.skills">{{skill.name}}</v-chip>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </transition>
</template>

<script>
    export default {
        name: "TutorListItem",
        props: ['id'],
        computed: {
            tutor() {
                return this.$store.getters.tutors.find(tutor => tutor.id == this.id)
            },
            profileImage() {
                return this.tutor.file ? '/storage/' + this.tutor.file.file_path : '/images/default-profile.png'
            },
        }
    }
</script>

<style scoped>

</style>