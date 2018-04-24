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
       <transition name="fade"
       mode="out-in">
           <router-view></router-view>
       </transition>
        <v-footer height="auto" class="grey darken-3">
            <v-layout row wrap justify-center>
                <v-btn
                        color="white"
                        flat
                        v-for="item in footerLinks"
                        :key="item.title"
                        router
                        :to="item.link"
                >
                    {{ item.title }}
                </v-btn>
                <v-flex xs12 py-3 text-xs-center white--text>
                    &copy;2018 — <strong>Education Plus</strong>
                </v-flex>
            </v-layout>
        </v-footer>
        <!--<v-footer class="pa-3">-->
            <!--<v-flex text-xs-center>-->
                <!--<div>&copy; {{ new Date().getFullYear() }}</div>-->
            <!--</v-flex>-->
        <!--</v-footer>-->
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
                        { title: 'Home', link: '/'},
                        { title: 'Browse teachers', link: ''},
                        { title: 'View courses', link: ''},
                        { title: 'My account', link: '/account'},
                    ]
                }
                return menuItems
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !==undefined
            },
            footerLinks() {
                let footerLinks = [
                    {title: 'Home', link: '/'},
                    {title: 'Tutors', link: ''},
                    {title: 'Courses', link: ''},
                    {title: 'Account', link: '/account'},
                    {title: 'Privacy policy', link: '/privacy'},
                ]

                return footerLinks
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