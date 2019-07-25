<template>
        <v-toolbar id="toolbar" dark color="primary">
        <v-toolbar-title class="white--text">NASA SEES Flood Response Team 2019</v-toolbar-title>
        <v-spacer></v-spacer>
                <v-btn fab dark color="indigo darken-1" @click="openSnow">
                        <v-icon>fa-snowflake</v-icon>
                </v-btn>
                <v-btn fab dark color="cyan darken-1" @click="openPop">
                        <v-icon>fa-users</v-icon>
                </v-btn>
                <v-btn fab dark color="blue darken-1" @click="openRain">
                        <v-icon>fa-tint</v-icon>
                </v-btn>
                <v-btn fab dark color="teal darken-1" @click="openPercip">
                        <v-icon>fa-cloud-showers-heavy</v-icon>
                </v-btn>
                <v-btn fab color="primary" @click="openScene">
                        <v-icon>3d_rotation</v-icon>
                </v-btn>
        </v-toolbar>

</template>

<script>
    export default {
            name: "Header",
            methods: {
                    openScene: function () {
                            this.$eventHub.$emit('openScene');
                    },
                    openSnow: function () {
                            this.$eventHub.$emit('openSnow', 'sheet1');
                    },
                    openPop: function () {
                            this.$eventHub.$emit('openPop','sheet2');
                    },
                    openRain: function () {
                            this.$eventHub.$emit('openRain', 'sheet3');
                    },
                    openPercip: function () {
                            this.$eventHub.$emit('openPrecip', 'sheet4');
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
