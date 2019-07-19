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
<!--                <v-list-group-->
                <v-divider></v-divider>
                <v-list-tile>
                    <v-list-tile-avatar>
                        <v-btn
                                icon
                                @click.stop="mini = !mini"
                        >
                            <v-icon>{{items[0].icon}}</v-icon>
                        </v-btn>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{items[0].title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-group
                        :value="false"
                >
                    <!--                        prepend-icon="map"-->

                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-btn
                                        icon
                                        @click.stop="mini = !mini"
                                >
                                    <v-icon>{{items[1].icon}}</v-icon>
                                </v-btn>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{items[1].title}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
<!--                    <v-list-group-->
<!--                            no-action-->
<!--                            sub-group-->
<!--                            :value="false"-->
<!--                    >-->
<!--                        <template v-slot:activator>-->
<!--                            <v-list-tile>-->
<!--                                <v-list-tile-title>Basemap 1</v-list-tile-title>-->
<!--                            </v-list-tile>-->
<!--                        </template>-->
                        <v-list-tile
                                v-for="(basemap1, i) in basemap1"
                                :key="i"
                                @click=""
                        >
                            <v-list-tile-title v-text="basemap1[0]"></v-list-tile-title>
                            <v-list-tile-action>
                                <v-icon v-text="basemap1[1]"></v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
<!--                </v-list-group>-->
                <v-list-group
                        :value="false">
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-btn
                                        icon
                                        @click.stop="mini = !mini"
                                >
                                    <v-icon>{{items[2].icon}}</v-icon>
                                </v-btn>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Data Layers</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-checkbox v-model="video"></v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-content @click="video = !video">
                            <v-list-tile-title>Video sounds</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <!--                    <v-list-tile-->
<!--                            v-for="(data1, i) in data1"-->
<!--                            :key="i"-->
<!--                            @click=""-->
<!--                    >-->
<!--                        <v-list-tile-title v-text="data1[0]"></v-list-tile-title>-->
<!--                        <v-list-tile-action>-->
<!--                            <v-icon v-text="data1[1]"></v-icon>-->
<!--                        </v-list-tile-action>-->

<!--                    </v-list-tile>-->
                </v-list-group>
                <v-list-tile>
                    <v-list-tile-avatar>
                        <v-btn
                                icon
                                @click.stop="mini = !mini"
                        >
                            <v-icon>{{items[3].icon}}</v-icon>
                        </v-btn>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{items[3].title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-avatar>
                        <v-btn
                                icon
                                @click.stop="mini = !mini"
                        >
                            <v-icon>{{items[4].icon}}</v-icon>
                        </v-btn>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{items[4].title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
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
        data() {
            return {
                drawer: true,
                items: [
                    {title: 'Home', icon: 'home'},
                    {title: 'BaseMaps', icon: 'map'},
                    {title: 'Data Layers', icon: 'layers'},
                    //embed sliders to data layers
                    //have sliders pop up on screen when new data layer added
                    // { title: 'Opacity', icon: 'opacity' },
                    {title: '3D scene', icon: '3d_rotation'},
                    {title: 'About', icon: 'info'}
                ],
                basemap1: [
                    ['Default', 'map'],
                    ['Streets', 'map']
                ],
                data1: [
                    ['Data 1', 'layers'],
                    //['Data 2', 'layers']
                ],
                mini: true,
                right: null,
                toggle: false //for check
            }
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