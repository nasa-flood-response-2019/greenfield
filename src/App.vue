<template>
    <div id="app">
    <v-app id="Header1">
        <v-content>
        <v-container fluid fill-height style="margin:0">
            <Navigation/>
            <Button></Button>
            <Sheets/>
            <Header/>
            <About style="display: none"/>
            <Scene id="dialogBox" style="display: none"/>
            <Map/>
        </v-container>
        </v-content>
    </v-app>
    </div>
</template>

<script>
    import Map from './components/Map.vue';
    import Header from './components/Header.vue';
    import Navigation from './components/Navigation.vue';
    import Scene from 'components/scene.vue';
    import About from 'components/About.vue';
    import Button from "components/Button.vue";
    import Sheets from "components/Sheets.vue";

    let x0;
    let y0;
    let z0;

    export default {
        name: "App1",
        components: {
            Button,
            Map,
            Navigation,
            Header,
            Scene,
            About,
            Sheets
            },
        mounted() {
            this.$eventHub.$on('openBox', this.makeAppear);
        },
        methods: {
            makeAppear() {
                console.log("started makeAppear()");
                this.$eventHub.$emit('init');
                let x = document.getElementById("dialogBox");
                if (x.style.display === "none") {
                    console.log("x.style.display = none");
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                    console.log("set display to none");
                }
            },
            onClickChild (x, y, z) {
                console.log("started onClickChild");
                this.x0 = Number(x);
                this.y0 = Number(y);
                this.z0 = Number(z);
                console.log(x);
                console.log(y);
                console.log(z);
            }
        },
        data() {
            return {
                x0: this.x0,
                y0: this.y0,
                z0: this.z0,
            }
        }
    }
</script>

<style>
#dialogBox {
    position: absolute;
    bottom: 3%;
    right: 2%;
    z-index: 2000;
}
</style>
