<template>
   <v-container>
       <v-layout row justify-center>
           <v-flex md4>
                  <v-card>
                      <v-card-text>
                          <app-alert v-if="error" @dismissed="onDismissed" :text="error"></app-alert>
                          <v-container>
                              <h3 class="headline mb-0">Sign up</h3>
                              <form @submit.prevent="onSignUp">
                                  <v-text-field
                                          label="Name"
                                          v-model="name"
                                          :rules="[isEmpty(name)]"

                                  ></v-text-field>
                                  <v-text-field
                                          label="E-mail"
                                          v-model="email"
                                          type="email"
                                          :rules="[isEmpty(email), isAvailableEmail]"
                                  ></v-text-field>
                                  <v-text-field
                                          label="Password"
                                          v-model="password"
                                          type="password"
                                          :rules="[isEmpty(password)]"
                                  ></v-text-field>
                                  <v-btn type="submit">Sign up</v-btn>
                              </form>
                          </v-container>
                      </v-card-text>
                  </v-card>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "signup",
        data() {
            return {
                name: '',
                email: '',
                password: '',
                formErrors: {}
            }
        },
        computed: {
            isAvailableEmail() {
                if(this.formErrors.email == null || this.formErrors.email === undefined){
                    return true;
                } else {
                    return this.formErrors.email[0]
                }
            },
            user() {
                return this.$store.getters.user
            },
            error() {
                return this.$store.getters.error
            }
        },
        methods: {
            isEmpty(field) {
                return field.length > 0 ? true : 'Field is required'
            },
            onSignUp() {
                this.formErrors = {}
                var formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('signUserUp', formData)
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            }
        },
        watch: {
            user(value) {
                if(value !== null && value !== undefined){
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style scoped>

</style>