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
                            <template v-for="group in groupsList">
                                <v-list-tile avatar :key="group.id"
                                             router
                                             :to="'/conversations/' + group.id">
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
                                            <router-view></router-view>
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

           }
        },
        created() {
            this.$store.dispatch('getConversations')
        },
        computed: {
            groupsList() {
                let groupsList = []

                if(this.groups != null && this.groups != undefined) {
                    this.groups.forEach(groupItem =>{
                        let groupObject = {
                            id: groupItem.id,
                            user: groupItem.users.find(user => user.id != this.user.id)
                        }
                        groupsList.push(groupObject)
                    });
                }
                return groupsList
            },
            groups() {
              return this.$store.getters.conversations
            },
            user() {
                return this.$store.getters.user
            }
        },
        methods: {
            listen() {
                let userId =  this.$store.getters.user.id
                console.log('listening: users.' + userId)
                Echo.private('users.' + userId)
                    .listen('GroupCreated', (e) => {
                        this.$store.dispatch('addConversation', e)
                    });
            }
        },
        watch: {
            user() {
                this.listen()
            }
        }
    }
</script>

<style scoped>

</style>