<template>
    <v-app light>
        <v-toolbar class="white">
            <v-toolbar-title>Educational platform</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-for="item in menuItems"
                       :key="item.title"
                       flat
                       router
                       :to="item.link">{{item.title}}</v-btn>
                <v-btn v-if="userIsAuthenticated" @click="logout" flat>Log out</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <router-view></router-view>
    </v-app>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {

            }
        },
        computed: {
            menuItems() {
                let menuItems = [
                    { title: 'Home', link: '/'},
                    { title: 'Sign in', link: '/signin'},
                    { title: 'Sign up', link: '/signup'},
                ]

                if(this.userIsAuthenticated) {
                    menuItems = [
                        { title: 'Browse teachers', link: ''},
                        { title: 'View courses', link: ''},
                        { title: 'My profile', link: ''},
                    ]
                }
                return menuItems
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !==undefined
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logOut')
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>