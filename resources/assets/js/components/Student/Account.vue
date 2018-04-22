<template>
    <v-container>
        <v-layout row justify-around>
            <v-flex md2 offset-md1>
                <v-navigation-drawer permanent>
                    <v-toolbar flat>
                        <v-list class="blue-grey lighten-4">
                            <v-list-tile>
                                <v-list-tile-title class="title">
                                    Your account
                                </v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-list dense class="pt-0">
                        <v-list-tile v-for="item in informationMenu"
                                     :key="item.title"
                                     router :to="item.link" exact>
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex md8>
                <v-card>
                    <v-card-text>
                       <v-container>
                           <v-layout row wrap justify-center>
                               <v-flex md12>
                                   <transition name="fade"
                                               mode="out-in">
                                   <router-view></router-view>
                                   </transition>
                                   <!--<component v-bind:is="currentPage"></component>-->
                               </v-flex>
                           </v-layout>
                       </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import PersonalInformation from './Profile'
    import Courses from './Courses'
    export default {
        methods: {
        },
        data() {
            return {
                accountMenu: [
                    {
                        title: 'Personal information',
                        link: '/student/account'
                    },
                    {
                        title: 'My courses',
                        link: '/student/account/courses'
                    },
                ]
            }
        },
        components:{

        }
    }
</script>

<style scoped>

</style>