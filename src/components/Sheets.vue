<template>
    <div id="hello">
        <v-container style="display: none" id="sheet1">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onSnow($event)'
                  v-model="opacity"
                  label='Snowmelt Timing'>
        </v-slider>
        <img src='snowmeltLegend.png' width="225" height="190">
    </v-sheet>
        </v-container>

        <v-container style="display: none" id="sheet2">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onPop($event)'
                  v-model="opacity1"
                  label='Population Density'>
        </v-slider>
        <img src='popDenseLegend.png' width="213" height="175">
    </v-sheet>
        </v-container>
        <v-container style="display: none" id="sheet3">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <img src='rainGaugeLegend.png' width="200" height="200">
<!--        <v-slider id="slider"-->
<!--                  class="sliderRight"-->
<!--                  @change='onRain($event)'-->
<!--                  v-model="opacity"-->
<!--                  label='Rain Gauge'>-->
<!--        </v-slider>-->
    </v-sheet>
        </v-container>
        <v-container style="display: none" id="sheet4">
    <v-sheet color="white"
             height="250"
             width="425"
    >
        <v-slider id="slider"
                  class="sliderRight"
                  @change='onPrecip($event)'
                  v-model="opacity2"
                  label="Precipitation Change">
        </v-slider>
        <img src='precipitationLegend.png' width="216" height="180">
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
                opacity1: 100,
                opacity2: 100
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
                onSnow: function(event) {
                    this.$eventHub.$emit('opacitySnow', event, 'esriSnowLayer');
                    console.log("opacitySnow emitted");
                },
                onPop: function(event) {
                    this.$eventHub.$emit('opacityPop', event, 'popDenseLayer');
                },
                onRain: function(event) {
                    this.$eventHub.$emit('opacityRain', event, 'gaugeLayer');
                },
                onPrecip: function(event) {
                    this.$eventHub.$emit('opacityPrecip', event, 'precipitationLayer');
                }
            },
        created() {
            this.$eventHub.$on('openSnow', this.oneSheet);
            this.$eventHub.$on('openRain', this.oneSheet);
            this.$eventHub.$on('openPop', this.oneSheet);
            this.$eventHub.$on('openPrecip', this.oneSheet);
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
