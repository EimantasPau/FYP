<template>
    <v-container>
        <h1 class="display-1 grey--text text--darken-1"> <v-btn fab small color="success" router to="/account/education"><v-icon medium color="white">arrow_back</v-icon ></v-btn> Update education</h1>
        <transition name="fade" mode="out-in">
            <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
        </transition>
        <v-form @submit.prevent="onSubmit" v-if="education" class="mt-2">
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-text-field
                            label="Name"
                            v-model="name"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-text-field
                            label="Institution"
                            v-model="institution"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-text-field
                            label="Classification"
                            v-model="classification"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-dialog
                            ref="startingModal"
                            persistent
                            v-model="startingModal"
                            lazy
                            full-width
                            width="290px"
                            :return-value.sync="startingDate"
                    >
                        <v-text-field
                                slot="activator"
                                label="Starting date"
                                v-model="startingDate"
                                prepend-icon="event"
                                readonly
                        ></v-text-field>
                        <v-date-picker color="green lighten-3" v-model="startingDate" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="startingModal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.startingModal.save(startingDate)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-dialog
                            ref="finishingModal"
                            persistent
                            v-model="finishingModal"
                            lazy
                            full-width
                            width="290px"
                            :return-value.sync="finishingDate"
                    >
                        <v-text-field
                                slot="activator"
                                label="Finishing date"
                                v-model="finishingDate"
                                prepend-icon="event"
                                readonly
                        ></v-text-field>
                        <v-date-picker color="green lighten-3" v-model="finishingDate" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="finishingModal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.finishingModal.save(finishingDate)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
                <v-flex>
                    <v-btn type="submit">Save</v-btn>
                    <v-btn router
                           to="/account/education"
                           color="error">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "EducationUpdate",
        props: ['id'],
        data() {
            return {
                name: '',
                classification: '',
                institution: '',
                startingDate: '',
                finishingDate: '',
                startingModal: false,
                finishingModal: false
            }
        },
        created() {
            this.name = this.education.name
            this.classification = this.education.classification
            this.institution = this.education.institution
            this.startingDate =this.education.started_on
            this.finishingDate =this.education.finished_on
        },
        methods: {
            onSubmit() {
                let formData = {
                    id: this.id,
                    name: this.name,
                    classification : this.classification,
                    institution: this.institution,
                    started_on: this.startingDate,
                    finished_on: this.finishingDate
                }
                this.$store.dispatch('updateEducation', formData)

            },
            onDismissed() {
                this.$store.dispatch('clearError','educationUpdate')
            }
        },
        computed: {
            errors() {
                return this.$store.getters.errors.educationUpdate;
            },
            education() {
               return this.$store.getters.user.education.find(education => {
                    return education.id == this.id;
                })

            }
        }
    }
</script>

<style scoped>

</style>