<template>
    <!--    <v-flex>-->
    <v-container v-show="sheetToggleFlg">
        <v-sheet id="sheet1"
                 color="grey lighten-3"
                 height="350"
                 width="350"
        >
            <h1>3D scene</h1>
<!--                    <v-container>-->
<!--            <v-slider id="slider"-->
<!--                      @change='onChange($event)'-->
<!--                      v-model="volume"-->
<!--                      label='Snowmelt Timing'>-->
<!--            </v-slider>-->
<!--                    </v-container>-->
        </v-sheet>
    </v-container>
    <!--        </v-flex>-->
</template>
<script>
    export default {
        name: "Scene",
        data () {
            return {
                volume: 10,
                sheetToggleFlg: false,
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
                document.getElementById("sheet1").style.zIndex = '100000';
                this.sheetToggleFlg = !this.sheetToggleFlg;
            },
            onChange: function(event) {
                console.log(event);
                //console.log(document.querySelector("#sheet1").style.display);
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
        display: block;
        position: absolute;
        bottom: 3%;
        right: 2%;
        z-index: 100000;
        /*display: none;*/
    }
</style>