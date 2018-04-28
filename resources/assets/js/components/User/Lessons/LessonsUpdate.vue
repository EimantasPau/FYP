<template>
    <v-container>
        <h1 class="display-1 grey--text text--darken-1"> <v-btn fab small color="primary" router :to="'/account/courses/'+ id + '/lessons'"><v-icon medium color="white">arrow_back</v-icon ></v-btn> Update lesson</h1>
        <transition name="fade" mode="out-in">
            <app-alert v-if="errors" @dismissed="onDismissed" :text="errors"></app-alert>
        </transition>
        <v-form @submit.prevent="onSubmit" class="mt-2" enctype="multipart/form-data">
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-text-field
                            label="Lesson title"
                            v-model="name"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout v-if="course.type_id == 1">
                <v-flex xs12 md6>
                    <v-btn
                            @click="selectFile"
                            color="blue-grey"
                            class="white--text"
                    >
                        Select video to upload.
                        <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                    <p v-if="filename"><strong>File selected</strong>: {{filename}}</p>
                    <input type="file" hidden ref="file" @change="handleFileUpload">
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <vue-editor v-model="content"></vue-editor>
                    <h2 class="grey--text text--darken-1 mt-3">Preview</h2>
                    <div id="textPlaceholder" class="xs12 mt-3"></div>
                </v-flex>
            </v-layout>
            <v-flex>
                <v-btn type="submit" :loading="uploading">Save</v-btn>
                <v-btn @click="onCancel"
                       color="error">Cancel</v-btn>
            </v-flex>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "LessonsUpdate",
        props: [
            'id',
            'lesson_id'
        ],
        data() {
            return {
                name: '',
                content: '',
                file: '',
                filename: ''
            }
        },
        created() {
            this.name = this.lesson.name
            this.content = this.lesson.content
            this.file = this.lesson.name
        },
        methods: {
            onSubmit() {
                let formData = new FormData();
                formData.append('name', this.name)
                formData.append('content', this.content)
                formData.append('lesson_id', this.lesson_id)
                let payload = {
                    lesson_id: this.lesson_id,
                    formData: formData
                }

                // let formData = {
                //     name: this.name,
                //     content: this.content,
                //     lesson_id: this.lesson_id,
                //     course_id: this.lesson.course_id
                // }
                if(this.$refs.file){
                    formData.append('file', this.$refs.file.files[0])
                }
                console.log('updated: ' + JSON.stringify(payload.formData.get('file')))
                this.$store.dispatch('updateLesson', payload)
            },
            onDismissed() {
                this.$store.dispatch('clearError','lessonUpdate')
            },
            onCancel() {
                this.$store.dispatch('clearError','lessonUpdate')
                this.$router.push('/account/courses/' + this.id + '/lessons')
            },
            selectFile(){
                this.$refs.file.click()
            },
            handleFileUpload(event) {
                this.filename = event.target.files[0].name;
                this.file = this.$refs.file.files[0]
            }
        },
        computed: {
            errors() {
                return this.$store.getters.errors.lessonUpdate;
            },
            course() {
                return this.$store.getters.user.owned_courses.find(course => {
                    return course.id == this.id;
                })
            },
            uploading() {
                return this.$store.getters.uploading
            },
            lesson() {
                return this.course.lessons.find(lesson => lesson.id == this.lesson_id);
            }
        },
        watch: {
            content(content) {
                document.getElementById('textPlaceholder').innerHTML = content
            }
        }
    }
</script>

<style scoped>

</style>