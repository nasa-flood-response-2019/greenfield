<template>
    <div id="hello">
        <v-container style="display: none" id="sheet1">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onChange($event)'
                  v-model="opacity"
                  label='Snowmelt Timing'>
        </v-slider>
        <img src='rainGaugeLegend.png' width="175" height="175">
    </v-sheet>
        </v-container>

        <v-container style="display: none" id="sheet2">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onChange($event)'
                  v-model="opacity"
                  label='Population Density'>
        </v-slider>
    </v-sheet>
        </v-container>
        <v-container style="display: none" id="sheet3">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onChange($event)'
                  v-model="opacity"
                  label='Rain Gauge'>
        </v-slider>
    </v-sheet>
        </v-container>
        <v-container style="display: none" id="sheet4">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onChange($event)'
                  v-model="opacity"
                  label="Precipitaion Change">
        </v-slider>
    </v-sheet>
        </v-container>
    </div>
</template>

<script>
    let sheets = ['sheet1', 'sheet2','sheet3', 'sheet4'];
    export default {
        name: "Sheets",
        data () {
            return {
                opacity: 100,
            }
        },
        methods:
            {
                oneSheet(sheet) {
                    let x = document.getElementById(sheet);
                    if(x.style.display === "none"){
                        x.style.display = "block";
                        for(let i=0; i<sheets.length; i++)
                        {
                            if(sheets[i] !== sheet)
                            {
                                document.getElementById(sheets[i]).style.display = 'none';
                            }
                        }
                    }
                    else{
                        x.style.display = "none";
                    }

                },
                onChange: function(event) {
                    console.log(event);
                    //console.log(document.querySelector("#sheet1").style.display);
                }
            },
        created() {
            this.$eventHub.$on('openSnow', this.oneSheet);
            this.$eventHub.$on('openRain', this.oneSheet);
            this.$eventHub.$on('openPop', this.oneSheet);
            this.$eventHub.$on('openPercip', this.oneSheet);
        }
    }
</script>

<style scoped>
    #hello{
        z-index: 4000;
        position: absolute;
        top: 10%;
        right: 33%;

    }
    #sheet1{
        position: absolute;
        top: 11%;
        right: 0%;
    }
    #sheet2{
        position: absolute;
        top: 11%;
        right: 0%;
    }
    #sheet3{
        position: absolute;
        top: 11%;
        right: 0%;
    }
    #sheet4{
        position: absolute;
        top: 11%;
        right: 0%;
    }
    .sliderRight{
        padding-right: 20px;
        padding-left: 10px;
    }

</style>