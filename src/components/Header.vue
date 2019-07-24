<template>
        <v-toolbar id="toolbar" dark color="primary">
        <v-toolbar-title class="white--text">NASA SEES Flood Response Team 2019</v-toolbar-title>
        <v-spacer></v-spacer>
                <v-btn rounded color="primary" dark>Snowmelt Timing</v-btn>
                <v-btn rounded color="primary" dark>Population Density</v-btn>
                <v-btn rounded color="primary" dark>Rain Gauges</v-btn>
                <v-btn rounded color="primary" dark>Percipitation Change</v-btn>
                <v-btn id="button" class="mx-2" fab dark color="indigo" @click="openScene">
                        <v-icon dark>3d_rotation</v-icon>
                </v-btn>
        </v-toolbar>

</template>

<script>
    export default {
            name: "Header",
            methods: {
                    openScene: function () {
                            this.$eventHub.$emit('openScene');
                    }
            }
    }
</script>

<style scoped>
        #toolbar{
                z-index: 1020;
                position: absolute;
                top: 0px;
                left: 0px;
                height: 75px;
        }
</style>