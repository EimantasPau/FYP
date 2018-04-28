<template>
   <v-container>
       <v-layout row justify-center>
           <v-flex lg4>
                  <v-card>
                      <v-card-text>
                          <transition name="fade" mode="out-in">
                              <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
                          </transition>
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
                                          :rules="[isEmpty(email)]"
                                  ></v-text-field>
                                  <v-text-field multi-line
                                                label="Please tell us a little about yourself"
                                                hint="This will be shown on your profile for other users."
                                                v-model="bio">
                                  </v-text-field>
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
                bio: ''
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            errors() {
                return this.$store.getters.errors['signUp']
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
                    bio: this.bio,
                    password: this.password
                }
                this.$store.dispatch('signUserUp', formData)
            },
            onDismissed() {
                this.$store.dispatch('clearError', 'signUp')
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