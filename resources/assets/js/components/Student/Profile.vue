<template>
    <v-container>
        <v-divider></v-divider>
        <v-layout row wrap justify-center>
            <v-flex md8>
                <h2 class="display-1 text-md-center py-4">{{profileUser.name}}'s profile</h2>
            </v-flex>
            <v-flex xs6 offset-xs3>
                <v-avatar
                        :tile="false"
                        :size="200"
                        class="grey lighten-4 text-xs-center d-block my-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaWsjTM9wIYQ-L9K5yj7MvBI222lgSd3fpML3zmdwQ8oPHS1Y4" alt="avatar">
                </v-avatar>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap justify-center class="mt-3">
            <v-flex md8>
                <p> Mauris non blandit cursus. In velit, neque vivamus amet elit quis, ac condimentum tristique morbi risus, id donec fermentum. Vel sodales laoreet massa convallis consectetuer praesent, rutrum vel rhoncus vel vivamus. Pharetra in condimentum elit dolor nulla vestibulum. Rutrum a aliquet id qui morbi, ut cras, urna ridiculus purus vehicula eros et eros, natoque varius gravida maecenas facilisis elit quisque. Ante vel ullamcorper curabitur imperdiet, libero tempor, eu wisi. Purus vehicula, dui necessitatibus venenatis platea, turpis dictum, porttitor sit felis. Lacus in sit justo lectus maecenas erat. Odio augue vestibulum. Vivamus nulla lacus nulla.</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "PersonalInformation",
        computed: {
            profileUser() {
                return this.$store.getters.user
            }
        },
    }
</script>

<style scoped>

</style>