<template>
    <v-container>
        <v-layout row justify-center>
            <v-flex md4>
                <v-card>
                    <v-card-text>
                        <app-alert v-if="error" @dismissed="onDismissed" :text="error"></app-alert>
                        <v-container>
                            <h3 class="headline mb-0">Sign in</h3>
                            <form @submit.prevent="onSignIn">
                                <v-text-field
                                        label="E-mail"
                                        v-model="email"
                                        type="email"
                                        :rules="[isEmpty(email)]"
                                ></v-text-field>
                                <v-text-field
                                        label="Password"
                                        v-model="password"
                                        type="password"
                                        :rules="[isEmpty(password)]"
                                ></v-text-field>
                                <v-btn type="submit">Sign in</v-btn>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Signin",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            isEmpty(field) {
                return field.length > 0 ? true : 'Field is required'
            },
            onSignIn() {
                var loginCredentials = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('signUserIn',loginCredentials)
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            error() {
                return this.$store.getters.error
            }
        },
        watch: {
            user(value) {
                if(value !== null && value !== undefined){
                    this.$router.push('/')
                }
            }
        },

    }
</script>

<style scoped>

</style>