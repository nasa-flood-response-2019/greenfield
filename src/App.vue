<template>
    <div id="main">
    <h1>Hello</h1>
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