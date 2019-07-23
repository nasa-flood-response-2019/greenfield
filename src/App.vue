<template>
    <v-app id="Header1">
        <v-content>
        <v-container fluid fill-height style="margin:0">
            <Navigation/>
            <Header/>
            <About style="display: none"/>
            <Scene style="display: none"/>
            <Map/>
        </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Map from './components/Map.vue';
    import Header from './components/Header.vue';
    import Navigation from './components/Navigation.vue';
    import Scene from 'components/scene.vue';
    import About from 'components/About.vue';

    export default {
        name: "App1",
        components: {
            Map,
            Navigation,
            Header,
            Scene,
            About
            // },
            // methods:{
            //     carryScene(){
            //         console.log("Hmmm - Yay");
            //         this.$eventHub.$emit("sceneOpen")
            //     }
            // },
            // created() {
            //     this.$eventHub.$on('openScene', this.carryScene);
            // }
        }
    }
</script>

<style scoped>

</style>