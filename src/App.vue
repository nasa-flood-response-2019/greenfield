<template>
    <v-app id="Header1">
        <v-content>
        <v-container fluid fill-height style="margin:0">
            <Navigation/>
            <Header/>
            <Map/>
<!--                <Test/>-->
        </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Map from './components/Map.vue';
    import Header from './components/Header.vue';
    import Navigation from './components/Navigation.vue';
    import Test from './components/Test.vue';

    export default {
        name: "App1",
        components: {
            Map,
            Navigation,
            Header,
            Test
        }
    }
</script>

<style scoped>

</style>