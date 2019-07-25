<template>
    <v-container v-show="testFlg">
        <v-sheet id="sheet1"
                 color="grey lighten-3"
                 height="350"
                 width="350"
        >
        <div id="viewDiv" class="esri-widget"></div>
        </v-sheet>
    </v-container>
</template>
<script>
    // downloaded the following from https://github.com/Esri/esri-loader
    import { loadModules } from 'esri-loader';
    import L from 'leaflet';

    let x0;
    let y0;
    let z0;

    export default {
        name: "Scene",
        // props: {
        //     x0: Number,
        //     y0: Number,
        //     z0: Number
        // },
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
                this.x0 = test._northEast.lat;
                this.y0 = test._northEast.lng;
                console.log(`${test._northEast.lat} ${test._northEast.lng}`);
            },
            // sceneOpen1(){
            //     document.getElementById("sheet1").style.zIndex = '100000';
            //     this.sheetToggleFlg = !this.sheetToggleFlg;
            // },
            onChange: function(event) {
                console.log(event);
            },
            initMap(x0, y0, z0) {
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
                        console.log("dskfjadskfds" + this.x0);
                        var view = new SceneView({
                            map: scene,
                            container: "viewDiv",
                           camera: {
                               position: {
                                   x: -119.622075,
                                   y: 37.720650,
                                   z: 2104.901239,
                                   spatialReference: {
                                       wkid: 3857
                                   }
                               },
                               heading: 85,
                               tilt: 65
                           }
                        });
                        console.log("built Sceneview");
                    }).catch(e => {
                    console.log(e);
                });
            }

        },
        // created()
        // {
        //     this.$eventHub.$on('openScene', this.sceneOpen1);
        //     //document.getElementById("sheet1").style.display = 'none';
        // }
    }
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
