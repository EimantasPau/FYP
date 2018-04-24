<template>
    <v-layout row wrap>
        <v-flex xs12>
            <h2 class="headline">Your skills</h2>
            <blockquote class="blockquote">Add your skills or area of knowledge. They will be used to make you easier to find!</blockquote>
            <v-text-field
                    label="Skill or area name"
                    v-model="skill_name"
                    type="text"
                    @keyup.enter.native="onSubmit"
            ></v-text-field>
            <transition-group name="fade" mode="out-in">
                <v-chip close
                        v-if="skills"
                        v-for="skill in skills"
                        :key="skill.id"
                        @input="onClose(skill)">
                    {{skill.name}}
                </v-chip>
            </transition-group>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Skills",
        data() {
            return {
                skill_name: ''
            }
        },
        methods: {
          onSubmit() {
              if(this.skill_name !== '') {
                  this.$store.dispatch('addSkill', { 'skill_name': this.skill_name})
                  this.skill_name = ''
              }
          },
          onClose(skill) {
              this.$store.dispatch('removeSkill', skill)

          }
        },
        computed: {
            skills() {
                return this.$store.getters.user.skills
            }
        }
    }
</script>

<style scoped>

</style>