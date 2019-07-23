<template>
    <v-flex>

        <v-sheet id="sheet1"
                class="d-flex"
                color="grey lighten-3"
                height="450"
                 width="450"

        >
        <p>Hello, this is for the 3Dscene</p>
        </v-sheet>
        </v-flex>
</template>

<script>
    export default {
        name: "scene",
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
            },
            created()
            {
                this.$eventHub.$on('openScene', this.sceneOpen1);
            },
            methods:
                {
                    sceneOpen1: function () {
                        console.log('scene working');
                        //toggle visibility for 3Dscene
                        //not working lol
                    }
                }
        }

    }
</script>

<style scoped>
    #sheet1{
        position: absolute;
        bottom: 3%;
        right: 2%;
        z-index: 2000;
    }
</style>