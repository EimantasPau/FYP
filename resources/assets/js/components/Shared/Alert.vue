<template>
    <v-alert type="error" dismissible @input="onClose" :value="true">
        <p v-for="error in text">{{error[0]}}</p>
    </v-alert>
</template>

<script>
    export default {
        props: [
           'text'
        ],
        methods: {
            onClose() {
                this.$emit('dismissed')
            }
        }
    }
</script>

<style scoped>

</style>