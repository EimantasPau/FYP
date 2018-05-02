<template>
    <v-container>
        <v-layout row justify-center>
            <v-flex lg4>
                <v-card>
                    <v-card-text>
                        <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
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
                                <v-btn
                                        type="submit"
                                        :loading="this.$store.getters.loading"
                                        :disabled="this.$store.getters.loading">Sign in</v-btn>
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
                this.$store.dispatch('clearError', 'signIn')
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            errors() {
                return this.$store.getters.errors.signIn
            }
        },
        watch: {
            user(value) {
                if(value !== null && value !== undefined){
                    this.$router.push('/courses')
                }
            }
        },

    }
</script>

<style scoped>

</style>