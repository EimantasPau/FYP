<template>
    <v-card v-if="user">
        <v-card-text>
            <transition name="fade" mode="out-in">
                <app-alert v-if="error" @dismissed="onDismissed" :text="error"></app-alert>
            </transition>
            <v-container>
                <h3 class="headline mb-0">Update details</h3>
                <v-form @submit.prevent="onUpdate">
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
                                  hint="This will be shown on your profile for other users."
                                  v-model="bio">
                    </v-text-field>
                    <input type="file" ref="profileImage">
                    <v-btn type="submit">Update</v-btn>
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
            error() {
                return this.$store.getters.error
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
                console.log(formData);
                this.$store.dispatch('updateUser', formData)
                this.$emit('updated');
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            }
        }
    }
</script>

<style scoped>

</style>