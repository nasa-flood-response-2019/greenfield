<template>
    <div id="hello">
    <v-sheet id="sheet1"
             color="deep-purple lighten-5"
             height="250"
             width="400"
    >
    </v-sheet>
    <v-sheet id="sheet2"
             color="deep-purple lighten-4"
             height="250"
             width="400"
    >
    </v-sheet>
    <v-sheet id="sheet3"
             color="deep-purple lighten-3"
             height="250"
             width="400"
    >
    </v-sheet>
    <v-sheet id="sheet4"
             color="deep-purple lighten-2"
             height="250"
             width="400"
    >
    </v-sheet>
    </div>
</template>

<script>
    export default {
        name: "SnowSheet",
        methods:
            {
                openSheet(sheet){
                    let x = document.getElementById(sheet);
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } else {
                        x.style.display = "none";
                    }
                },
            },
        created() {
            this.$eventHub.$on('openSnow', this.openSheet);
            this.$eventHub.$on('openRain', this.openSheet);
            this.$eventHub.$on('openPop', this.openSheet);
            this.$eventHub.$on('openPercip', this.openSheet);
        }
    }
</script>

<style scoped>
    #hello{
        z-index: 4000;
    }
    #sheet1{
        position: absolute;
        top: 11%;
        right: 1%;
    }
    #sheet2{
        position: absolute;
        top: 11%;
        right: 1%;
    }
    #sheet3{
        position: absolute;
        top: 11%;
        right: 1%;
    }
    #sheet4{
        position: absolute;
        top: 11%;
        right: 1%;
    }

</style>