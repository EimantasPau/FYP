<template>
    <v-content>
        <v-container fill-height grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md3>
                    <v-navigation-drawer permanent width="100%">
                        <v-toolbar flat>
                            <v-list class="grey darken-3">
                                <v-list-tile>
                                    <v-list-tile-title class="title white--text">
                                        Your conversations
                                    </v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-toolbar>
                        <v-list two-line v-if="user">
                            <template v-for="(group, index) in groupsList">
                                <v-list-tile avatar :key="group.id" @click="">
                                    <v-list-tile-avatar>
                                        <img :src="group.user.file ? '/storage/' + group.user.file.file_path : '/images/default-profile.png'" alt="avatar">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="group.user.name"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-navigation-drawer>
                </v-flex>
                <v-flex xs12 md9>
                    <v-card height="100%">
                        <v-card-text>
                            <v-container class="m-0">
                                <v-layout row wrap justify-center>
                                    <v-flex md12>
                                        <transition name="fade"
                                                    mode="out-in">

                                        </transition>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Groups",
        data() {
            return {
                groups: null
            }
        },
        created() {
            this.getGroups()
        },
        computed: {
            groupsList() {
                let groups = []

                if(this.groups != null && this.groups != undefined) {
                    this.groups.forEach(group =>{
                        let groupObject = {
                            id: group.id,
                            user: group.users.find(user => user.id != this.user.id)
                        }
                        groups.push(groupObject)
                    });
                }
                return groups
            },
            user() {
                return this.$store.getters.user
            }
        },
        methods: {
            getGroups() {
                let token = localStorage.getItem('token')
                axios.get('/api/groups?token=' + token)
                    .then(response => {
                        this.groups = response.data.groups
                    })
            }
        }
    }
</script>

<style scoped>

</style>