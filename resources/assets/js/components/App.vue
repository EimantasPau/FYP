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
        <v-footer class="pa-3">
            <v-flex text-xs-center>
                <div>&copy; {{ new Date().getFullYear() }}</div>
            </v-flex>
        </v-footer>
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

                if(this.userIsStudent) {
                    menuItems = [
                        { title: 'Home', link: '/'},
                        { title: 'Browse teachers', link: ''},
                        { title: 'View courses', link: ''},
                        { title: 'My account', link: '/student/account' }
                    ]
                }

                if(this.userIsTutor) {
                    menuItems = [
                        { title: 'Home', link: '/'},
                        { title: 'My account', link: '/tutor/account'},
                    ]
                }
                return menuItems
            },
            userIsStudent() {
                return this.$store.getters.user !== null
                    && this.$store.getters.user !==undefined
                    && this.$store.getters.user.role_id == 1
            },
            userIsTutor() {
                return this.$store.getters.user !== null
                    && this.$store.getters.user !==undefined
                    && this.$store.getters.user.role_id == 2
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