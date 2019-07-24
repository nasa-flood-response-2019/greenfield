<template>
    <!--    <v-flex>-->
    <v-sheet id="sheet1"
             color="grey lighten-3"
             height="450"
             width="450"
    >
        <p>Hello, this is for the 3Dscene</p>
    </v-sheet>
    <!--        </v-flex>-->
</template>
<script>
    export default {
        name: "Scene",
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