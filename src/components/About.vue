<template>

        <v-sheet id="aboutSheet"
                 color="light-blue lighten-4"
                 height="600"
                 width="1200"

        >
            <v-container
                    id="scroll-target"
                    style="max-height: 550px"
                    class="scroll-y"
            >
<!--                style height in above tag changes height of text within the container-->
                <v-layout

                        column
                        align-center
                        justify-top
                        style="height: 500px"
                >
<!--                    changes height of the scroll-->
<!--                use the v-layout when enough information is in there to use a scroll-->
                    <div id="words">
                    <h1>NASA SEES Flood Response Team: About Page</h1>
                    <p>hello world</p>
                    </div>
                </v-layout>
            </v-container>
        </v-sheet>
    
</template>

<script>
    export default {
        name: "About",
        components: {
            SheetFooter: {
                functional: true,

                render(h, {children}) {
                    return h('v-sheet', {
                        staticClass: 'mt-auto align-center justify-center d-flex',
                        props: {
                            color: 'rgba(0, 0, 0, .36)',
                            dark: true,
                            height: 200,
                            width: 100
                        }
                    }, children)
                }
            }
        },
            created()
            {
                this.$eventHub.$on('openAbout', this.aboutOpen);
            },
            methods:
                {
                    aboutOpen: function () {
                        //console.log('about working');
                        //toggle visibility for 3Dscene
                        //not working lol
                        let about = document.getElementById("aboutSheet");
                        if (about.style.display === "none") {
                            about.style.display = "block";
                        } else {
                            about.style.display = "none";
                        }
                    }
                }

    }
</script>

<style scoped>
    #aboutSheet{
        position: absolute;
        bottom: 11%;
        right: 5%;
        z-index: 1009;
    }

    #words{
        z-index: 3000;
    }
</style>