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
                                <v-list-tile-title>Basemaps</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    <v-list-group
                            no-action
                            sub-group
                            :value="false"
                    >
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-title>Basemap 1</v-list-tile-title>
                            </v-list-tile>
                        </template>

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

                </v-list-group>
<!--                    MENU ITEM 2-->
                    <v-list-group
                            prepend-icon="layers"
                            :value="false"
                    >
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-title>Data Layers</v-list-tile-title>
                            </v-list-tile>
                        </template>
                        <v-list-group
                                no-action
                                sub-group
                                :value="false"
                        >
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-title>DataLayer 1</v-list-tile-title>
                                </v-list-tile>
                            </template>

                            <v-list-tile
                                    v-for="(data1, i) in data1"
                                    :key="i"
                                    @click=""
                            >
                                <v-list-tile-title v-text="data1[0]"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-icon v-text="data1[1]"></v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list-group>


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

<!--            <v-list-tile-->
<!--                    v-for="item in items"-->
<!--                    :key="item.title"-->
<!--                    @click=""-->
<!--            >-->
<!--                <v-list-tile-action>-->
<!--                    <v-icon>{{ item.icon }}</v-icon>-->
<!--                </v-list-tile-action>-->
<!--                <v-list-tile-title>-->
<!--                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
<!--                    <v-list-group-->
<!--                            no-action-->
<!--                            sub-group-->
<!--                            value="true"-->
<!--                            v-if="drop">-->

<!--                        <v-list-tile-content>-->
<!--                                <v-list-tile>-->
<!--                                    <v-list-tile-title>Basemaps</v-list-tile-title>-->
<!--                                </v-list-tile>-->
<!--                    <v-list-tile-->
<!--                            v-for="(base, i) in bases"-->
<!--                            :key="i"-->
<!--                            @click=""-->
<!--                    >-->
<!--                        <v-list-tile-title v-text="base[0]"></v-list-tile-title>-->
<!--                        <v-list-tile-action>-->
<!--                            <v-icon v-text="base[1]"></v-icon>-->
<!--                        </v-list-tile-action>-->
<!--                    </v-list-tile>-->
<!--                        </v-list-tile-content>-->
<!--                    </v-list-group>-->
<!--                </v-list-tile-title>-->
<!--            </v-list-tile>-->

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
        data(){
                return {
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
                basemap1: [
                    ['Feature 1', 'map'],
                    ['Feature 2', 'home']
                ],
                data1: [
                    ['Data 1', 'map'],
                    ['Data 2', 'home']
                ],
                mini: true,
                right: null,
                bases: [
                         ['Default', 'map'],
                         ['Streets', 'map']
                 ]
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