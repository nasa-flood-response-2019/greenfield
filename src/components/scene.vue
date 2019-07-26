<template>
    <v-container v-show="testFlg">
        <v-sheet id="sheet1"
                 color="grey lighten-3"
                 height="350"
                 width="450"
        >
        <v-btn @click="refreshMap()" id="refreshBtn" fab dark color="teal darken-1"><v-icon>refresh</v-icon></v-btn>
        <div id="viewDiv" class="esri-widget"></div>
        </v-sheet>
    </v-container>
</template>
<script>
    // downloaded the following from https://github.com/Esri/esri-loader
    import { loadModules } from 'esri-loader';
    import L from 'leaflet';

    let noX;
    let noY;
    let kachow;

    export default {
        name: "Scene",
        data () {
            return {
                volume: 10,
                testFlg: false,
            }
        },
        mounted() {
            this.$eventHub.$on("init", this.initMap);
        },
        created() {
            this.$eventHub.$on("latlng", this.test);
        },
        components: {
            SheetFooter: {
                functional: true,
                render(h, {children}) {
                    return h('v-sheet', {
                        staticClass: 'mt-auto align-center justify-center d-flex',
                        props: {
                            color: 'rgba(0, 0, 0, .36)',
                            dark: true,
                            height: 100,
                            width: 100
                        }
                    }, children)
                }
            }
        },
        methods:{
            test(test) {
                console.log(test);
                this.noX = Number(test.lat);
                this.noY = Number(test.lng);
                console.log(this.noX + " " + this.noY);
            },
            onChange: function(event) {
                console.log(event);
            },
            initMap() {
                this.testFlg = !this.testFlg;
                console.log(this.testFlg);
                loadModules(['esri/views/SceneView', 'esri/config', 'esri/WebScene', 'esri/Camera'])
                    .then(([SceneView, esriConfig, WebScene, Camera]) => {
                        esriConfig.portalUrl = "https://agportalw-sec-green7.csr.utexas.edu/portal";
                        var scene = new WebScene({
                            portalItem: {
                                id: "a3bbc622780843b08eb5d13ff2d65a10"
                            }
                        });
                        console.log("started Sceneview");
                        console.log("Latitude: " + this.noX + ", Longitude: " + this.noY);
                        this.kachow = new SceneView({
                            map: scene,
                            container: "viewDiv",
                            camera: {
                               position: {
                                //    x: this.noY,
                                //    y: this.noX,
                                    x: -93.91242,
                                    y: 29.946438,
                                    z: 60,
                                   spatialreference: {
                                       wkid: 4326,
                                   }
                               },
                               tilt: 84,
                               heading: 60
                           }
                        });
                        console.log("built Sceneview");
                    }).catch(e => {
                    console.log(e);
                });
            },
            refreshMap() {
                loadModules(['esri/views/SceneView', 'esri/config', 'esri/WebScene', 'esri/Camera'])
                    .then(([SceneView, esriConfig, WebScene, Camera]) => {
                        var cam = new Camera({
                               position: {
                                   x: this.noY,
                                   y: this.noX,
                                    // x: -93.91242,
                                    // y: 29.946438,
                                    z: 60,
                                   spatialreference: {
                                       wkid: 4326,
                                   }
                               },
                               tilt: 84,
                               heading: 60      
                        })
                        this.kachow.camera = cam;
                        console.log("built Sceneview");
                    }).catch(e => {
                    console.log(e);
                });
            },
        }
    }
    // }
</script>
<style scoped>
    #sheet1{
        display: block;
        position: absolute;
        bottom: 3%;
        right: 2%;
        z-index: 100000;
        /*display: none;*/
    }
    #viewDiv {
        z-index: 2000;
        width: 100%;
        height: 100%;
    }
</style>
