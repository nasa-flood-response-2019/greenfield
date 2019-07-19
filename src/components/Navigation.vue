<template>
    <v-navigation-drawer id = "drawer"
                         v-model="drawer"
                         :mini-variant.sync="mini"
                         hide-overlay
                         stateless
                         v-bind:width="350"
    >
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/nasa-282190.png">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Web Map Menu</v-list-tile-title>
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



            <v-divider></v-divider>

<<<<<<< HEAD
                <v-list-tile avatar>
                    <v-list-tile-avatar>

                    </v-list-tile-avatar>

                </v-list-tile>
<!--            <v-list-tile-->
<!--                    v-for="item in items"-->
<!--                    :key="item.title"-->
<!--                    @click=""-->
<!--            >-->
<!--                <v-list-tile-action>-->
<!--                    <v-icon>{{ item.icon }}</v-icon>-->
<!--                </v-list-tile-action>-->
<!--                <v-list-tile-content>-->
<!--                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
<!--                </v-list-tile-content>-->
<!--            </v-list-tile>-->
=======
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    @click=""
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-group
                            no-action
                            sub-group
                            value="true"
                            v-if="drop">

                        <v-list-tile-content>
                                <v-list-tile>
                                    <v-list-tile-title>Basemaps</v-list-tile-title>
                                </v-list-tile>
                    <v-list-tile
                            v-for="(base, i) in bases"
                            :key="i"
                            @click=""
                    >
                        <v-list-tile-title v-text="base[0]"></v-list-tile-title>
                        <v-list-tile-action>
                            <v-icon v-text="base[1]"></v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                        </v-list-tile-content>
                    </v-list-group>
                </v-list-tile-title>
            </v-list-tile>
>>>>>>> 80ff774716f5155e83b87ba81e5bdbac6a7a0c89
        </v-list>
        </v-toolbar>
    </v-navigation-drawer>
</template>
<script>
    //import Header from './components/Header.vue';
    export default {
        name: "Navigation",
        props:
            {
                width: 400
            },
            data: {
                // return {
                    drawer: true,
                    items: [
                        {title: 'Home', icon: 'home', drop: false, check: false},
                        {title: 'Basemaps', icon: 'map', drop: true, check: true},
                        {title: 'Data Layers', icon: 'layers', drop: false, check: false},
                        //embed sliders to data layers
                        //have sliders pop up on screen when new data layer added
                        // { title: 'Opacity', icon: 'opacity' },
                        {title: '3D scene', icon: '3d_rotation', drop: false, check: false},
                        {title: 'About', icon: 'info', drop: false, check: false}
                    ],
                    mini: true,
                    right: null,
                    bases: [
                             ['Default', 'map'],
                             ['Streets', 'map']
                         ],
                // }
            }
        }
</script>
<style scoped>
    #drawer{
        z-index: 1010;
        position: absolute;
        top: 55px;
        left: 0px;
    }
</style>