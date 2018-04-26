<template>
    <div v-if="this.$store.getters.user">
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Courses"
    }
</script>

<style scoped>

</style>