<template>
    <!--    <v-flex>-->
    <v-sheet id="sheet1"
             color="grey lighten-3"
             height="350"
             width="350"
    >
        <h3>Layer Opacity</h3>
<!--        <v-container>-->
            <v-slider v-model="volume"
                      @change='onChange($event)'
                      label='Snowmelt Timing'>
            </v-slider>
<!--        </v-container>-->
    </v-sheet>
    <!--        </v-flex>-->
</template>'

<script>
    export default {
        name: "Scene",
        data () {
            return {
                volume: 10,
            }
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
            sceneOpen1(){
                let scene = document.getElementById("sheet1");
                if (scene.style.display === "none") {
                    scene.style.display = "block";
                } else {
                    scene.style.display = "none";
                }
            },
            onChange: function(event) {
                console.log(event);
            }
        },
        created()
        {
            this.$eventHub.$on('openScene', this.sceneOpen1);
            //document.getElementById("sheet1").style.display = 'none';
        }
    }
</script>
<style scoped>
    #sheet1{
        position: absolute;
        bottom: 3%;
        right: 2%;
        z-index: 1008;
        /*display: none;*/
    }
</style>