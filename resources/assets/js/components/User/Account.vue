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
                                        Your account
                                    </v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-list class="pt-0">
                            <v-list-group sub-group>
                                <v-list-tile slot="activator">
                                    <v-list-tile-title>Personal details</v-list-tile-title>
                                </v-list-tile>
                                    <v-list-tile v-for="item in detailsMenu"
                                                 :key="item.title"
                                                 router :to="item.link" exact active-class="light-blue accent-4 white--text">
                                        <v-list-tile-action>
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                            </v-list-group>
                            <v-list-group sub-group>
                                <v-list-tile slot="activator">
                                    <v-list-tile-title>Courses</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile v-for="item in coursesMenu"
                                             :key="item.title"
                                             router :to="item.link" exact active-class="light-blue accent-4 white--text">
                                    <v-list-tile-action>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
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
        name: "Account",
        data() {
            return {
                detailsMenu: [
                    {
                        title: 'Basic information',
                        link: '/account',
                        icon: 'person_outline'
                    },
                    {
                        title: 'Education',
                        link: '/account/education',
                        icon: 'library_books'
                    },
                    {
                        title: 'Experience',
                        link: '/account/experience',
                        icon: 'work'
                    }
                ],
                coursesMenu: [
                    {
                        title: 'My courses',
                        link: '/account/courses',
                        icon: 'featured_play_list'
                    },
                    {
                        title: 'Create new course',
                        link: '/account/courses/create',
                        icon: 'add_circle_outline'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>