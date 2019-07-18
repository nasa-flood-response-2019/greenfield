<template>
    <v-app id="Header1">
        <v-content>
        <v-container fluid fill-height style="margin:0">
            <Navigation/>
            <Map/>

        </v-container>
        </v-content>
    </v-app>
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