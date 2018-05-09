<template>
    <v-content v-if="user && groups">
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
                        <v-list two-line>
                            <v-list-tile v-if="groups.length <= 0">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        You have not started any conversations
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <template v-for="group in groups">
                                <v-list-tile avatar :key="group.id"
                                             router
                                             :to="'/conversations/' + group.id">
                                    <v-list-tile-avatar>
                                        <img :src="group.users.find(otherUser=> otherUser.id != user.id).file ? '/storage/' + group.users.find(otherUser=> otherUser.id != user.id).file.file_path : '/images/default-profile.png'" alt="avatar">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="group.users.find(otherUser=> otherUser.id != user.id).name"></v-list-tile-title>
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
                .then(()=>{
                    this.listen()
                })
        },
        beforeDestroy(){
            let userId =  this.$store.getters.user.id
            console.log('leaving: users.' + userId)
            Echo.leave('users.' + userId)
            this.groups.forEach(chat =>{
                console.log('leaving: groups.' + chat.id)
                Echo.leave('groups.' + chat.id)
            })
        },
        computed: {
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
            groups(groups) {
                groups.forEach(chat =>{
                    console.log('leaving: groups.' + chat.id)
                    Echo.leave('groups.' + chat.id)
                })
                groups.forEach(chat =>{
                    console.log('listening: groups.' + chat.id)
                    Echo.private('groups.' + chat.id)
                        .listen('MessageCreated', (e) => {
                            console.log(e)
                            this.$store.dispatch('insertMessage', e.conversation)
                                .then(()=>{
                                    let currentHeight = document.getElementById('messageContainer').scrollHeight;
                                    if(currentHeight){
                                        this.$refs.Scrollbar.scrollToY(currentHeight)
                                    }

                                })
                        });
                })

            }
        }
    }
</script>

<style scoped>

</style>