<template>
    <v-card v-if="user">
        <v-card-text>
            <transition name="fade" mode="out-in">
                <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
            </transition>
            <v-container>
                <h3 class="headline mb-0">Update details</h3>
                <v-form>
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
                                  label="Your bio"
                                  hint="This will be shown on your profile visible to other users."
                                  v-model="bio">
                    </v-text-field>
                    <input class="d-block" type="file" ref="profileImage">
                    <v-layout justify-end>
                        <v-btn  :loading="this.$store.getters.loading"
                                :disabled="this.$store.getters.loading || !validate"
                               @click="onUpdate">Update</v-btn>
                        <v-btn color="error" @click="onCancel">Cancel</v-btn>
                    </v-layout>
                </v-form>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                name: this.user.name,
                email: this.user.email,
                bio: this.user.bio,
                profile_image: ''

            }
        },
        props: {
            user: Object
        },
        computed: {
            errors() {
                return this.$store.getters.errors.basicInfo
            },
            validate() {
                return this.name !== '' && this.email !== '' && this.bio !== ''
            }
        },
        methods: {
            isEmpty(field) {
                return field.length > 0 ? true : 'Field is required'
            },
            onUpdate() {
                let formData = new FormData();
                formData.append('name', this.name)
                formData.append('email', this.email)
                formData.append('bio', this.bio)
                formData.append('profile_image', this.$refs.profileImage.files[0])
                this.$store.dispatch('updateUser', formData)
            },
            onDismissed() {
                this.$store.dispatch('clearError', 'basicInfo')
            },
            onCancel() {
                this.$emit('canceled')
                this.$store.dispatch('clearError', 'basicInfo')
                let payload = {
                    form: 'updateDialog',
                    isDisplaying: false
                }
                this.$store.dispatch('setDisplaying', payload)
            }
        }
    }
</script>

<style scoped>

</style>