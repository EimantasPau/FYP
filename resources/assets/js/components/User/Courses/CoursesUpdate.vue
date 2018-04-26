<template>
    <v-container>
        <h1 class="display-1 grey--text text--darken-1"> <v-btn fab small color="primary" router to="/account/courses"><v-icon medium color="white">arrow_back</v-icon ></v-btn> Update an existing course</h1>
        <transition name="fade" mode="out-in">
            <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
        </transition>
        <v-form @submit.prevent="onSubmit" class="mt-2">
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
                    <v-select
                            :items="types"
                            v-model="type_id"
                            label="Please select course type"
                    ></v-select>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12>
                    <v-switch label="Publish. If you publish, other people will be able to see your course." v-model="published"></v-switch>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-select
                            label="Please put in a few tags to help identify your course."
                            chips
                            tags
                            solo
                            append-icon=""
                            clearable
                            v-model="tags"
                    >
                        <template slot="selection" slot-scope="data">
                            <v-chip
                                    close
                                    @input="remove(data.item)"
                                    :selected="data.selected"
                            >
                                <strong>{{ data.item }}</strong>&nbsp;
                            </v-chip>
                        </template>
                    </v-select>
                </v-flex>
                <v-flex xs12>
                    <vue-editor v-model="description"></vue-editor>
                    <h2 class="grey--text text--darken-1 mt-3">Preview</h2>
                    <div id="textPlaceholder" class="xs12 mt-3"></div>
                </v-flex>
            </v-layout>
            <v-flex>
                <v-btn type="submit">Save</v-btn>
                <v-btn @click="onCancel"
                       color="error">Cancel</v-btn>
            </v-flex>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "CoursesUpdate",
        props: ['id'],
        data() {
            return {
                name: '',
                description: '',
                type_id: '',
                published: false,
                types: [],
                tags: []
            }
        },
        created() {
            this.name = this.course.name
            this.description = this.course.description
            this.type_id = this.course.type_id
            this.published = this.course.status_id === 2
            this.course.tags.forEach(tag => this.tags.push(tag.name))
            const token = localStorage.getItem('token')
            axios.get('/api/coursetypes?token=' + token)
                .then(response => {
                    response.data.types.forEach(type => {
                        let typeObject = {
                            text: type.name,
                            value: type.id
                        }
                        this.types.push(typeObject)
                    })
                })
        },
        methods: {
            onSubmit() {
                let formData = {
                    id: this.id,
                    name : this.name,
                    description : this.description,
                    type_id : this.type_id,
                    tags: this.tags,
                    status_id: this.published ? 2 : 1
                }
                this.$store.dispatch('updateCourse', formData)

            },
            onDismissed() {
                this.$store.dispatch('clearError','courseUpdate')
            },
            onCancel() {
                this.$store.dispatch('clearError','courseUpdate')
                this.$router.push('/account/courses')
            },
            remove (item) {
                this.tags.splice(this.tags.indexOf(item), 1)
                this.tags = [...this.tags]
            }
        },
        computed: {
            errors() {
                return this.$store.getters.errors.courseUpdate;
            },
            course() {
                return this.$store.getters.user.owned_courses.find(course => {
                    return course.id == this.id;
                })

            }
        },
        watch: {
            description(description) {
                document.getElementById('textPlaceholder').innerHTML = description
            }
        }
    }
</script>

<style scoped>

</style>