<template>
    <div id="main">
    <Map />
        <Navigation/>
    </div>
</template>

<script>
    import Map from './components/Map.vue';
    import Navigation from './components/Navigation.vue';

    export default {
        name: "App1",
        components: {
            Map,
            Navigation
        }
    }
</script>

<style scoped>

</style>