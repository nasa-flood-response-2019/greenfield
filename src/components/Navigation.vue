<template>
    <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            hide-overlay
            stateless
    >
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/nasa-282190.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>SEES Flood Response 2019</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                                icon
                                @click.stop="mini = !mini"
                        >
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    @click=""
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Navigation",
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Home', icon: 'home' },
                    { title: 'Layer Toggles', icon: 'layers' },
                    { title: 'Sliders', icon: 'opacity' },
                    { title: '3D scene', icon: '3d_rotation' },
                    { title: 'About', icon: 'info' }
                ],
                mini: true,
                right: null
            }
        }
    }
</script>

<style scoped>

</style>