<template>
    <div id="mapTexas" v-on:click="passData()"></div>
</template>
<script>
    import L from "leaflet";
    import * as esri from "esri-leaflet";
    import * as wmts from "leaflet-tilelayer-wmts";
    import axios from 'axios';
    import Vue from 'vue';
    import * as MakiMarkers from './scripts/Leaflet.MakiMarkers';
    import './scripts/utility';
    let movesMap;
    let esriAerialsLayer;
    let esriAerialsLabels;
    let esriToposLayer;
    let esriStreetsLayer;
    let gaugeLayer;
    let googleImageryLayer;
    let maskingSentinelApr16;
    let esriSnowLayer;
    let popDenseLayer;
    let precipitationLayer;
    let gauge_geojs;
    let layer_2 = false;

    export default {
        name: "Map",
        // components: {
        //     DialogDrag
        // },
        data() {
            return {
                map: [],
                markers: null,
                txCapQueryTotalRecordsCount:null,
                txCapQueryCurrentDate:null,
                txCapQuerySpatial:null,
            }
        },
        methods:{
            //initializeMap: initializeMap()
            toggleLayer,
            //addRemoveMaskTornado:addRemoveMaskTornado,
            resetMap,
            redrawMap,
            goToBookmark,
            goToLocation,
            getMapInfo,
            changeLayer,
            changeOpacity,
            calc_opt,
            calc_dist,
            passData() {
                this.$eventHub.$emit("latlng", movesMap.getCenter());
                // movesMap.on('moveend', this.onMapClick)
            },
            // onMapClick(e) {
            //     this.$eventHub.$emit("latlng", e.target._lastCenter);
            // }
        },
        mounted(){
            //console.log(this.$store.state.count);
            esriToposLayer = esri.basemapLayer("Topographic");
            esriAerialsLayer = esri.basemapLayer('Imagery',{attribution: "ESRI et al",hideLogo:"true"});
            esriAerialsLabels = esri.basemapLayer('ImageryLabels');
            esriStreetsLayer = esri.basemapLayer('Streets',{attribution: "ESRI et al",hideLogo:"true"});
            googleImageryLayer = wmts.tileLayerWMTS('https://txgi.tnris.org/login/path/arena-baker-mouse-bonus/wmts?',

                {
                    layer: 'texas',
                    style: "normal",
                    tilematrixSet: "0to20",
                    maxZoom: 20,
                    transparent: true,
                    format: "image/png"
                }
            );
            movesMap = L.map("mapTexas", {
                center: [38.3117, -98.77774],
                zoom: 5,
                layers: [
                    esriToposLayer
                ]
            });

            // legend = L.control({
            //     // position: 'topright'
            // }).addTo(movesMap);

            // legend = L.control({ position: "topright" });
            //
            // legend.onAdd = function(movesMap) {
            //     var div = L.DomUtil.create("div", "legend");
            //     div.innerHTML += "<h4>Tegnforklaring</h4>";
            //     div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
            //     div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
            //     div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
            //     div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
            //     div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
            //     div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
            //
            //
            //
            //     return div;
            // };
            //
            // legend.addTo(movesMap);

            popDenseLayer = esri.featureLayer({
                url:'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/Congressional_District_Demographics/FeatureServer/0',
                simplifyFactor: .5,
                precision: 10,
                //may need to use a different property in order to fill polygons correctly
                style: function (feature) {
                    if (feature.properties.POPDENS_CY >2792)
                        return {fillColor: "#c20000", fillOpacity: 1, color:'black', weight:1};
                    else if (feature.properties.POPDENS_CY >699)
                        return {fillColor: "#f33506", fillOpacity: 1, color:'black', weight:1};
                    else if (feature.properties.POPDENS_CY >189)
                        return {fillColor: "#ff8843", fillOpacity: 1, color:'black', weight:1};
                    else if (feature.properties.POPDENS_CY >90)
                        return {fillColor: "#ffcd7d", fillOpacity: 1, color:'black', weight:1};
                    else
                        return {fillColor: "#fff1d6", fillOpacity: 1, color:'black', weight:1};

                    // if (feature.properties.POPDENS_CY >500)
                    //     return {fillColor: "#c20000", fillOpacity: 1};
                    //
                    // else
                    //     return {fillColor: "#fff1d6", fillOpacity: 1};

                }
            }).addTo(movesMap);

            movesMap.removeLayer(popDenseLayer);
            window.onload = function() {
                L.Icon.Default.imagePath = 'undefined';
                let mkr_map = new hashmap();
                const MAX_DIST = 4;
                (async () => {
                    const response = await axios.get('http://129.116.70.166/ida_gauges/api/ahps/gauges/');
                    let geojs = response.data.features;
                    gauge_geojs=geojs;
                    let lyr = L.geoJSON();//.addTo(movesMap);
                    for(let i = 0; i<geojs.length; ++i) {
                        lyr.addData(geojs[i]);
                        let mkr = L.marker([geojs[i].geometry.coordinates[1],
                            geojs[i].geometry.coordinates[0]]);
                        mkr.addTo(lyr);
                        mkr_map.add(geojs[i].geometry.coordinates[1],geojs[i].geometry.coordinates[0],mkr);
                        let stat = geojs[i].properties.status;
                        manage(mkr, stat);
                        gaugeLayer = lyr;
                    };
                    movesMap.on('click', function(e) {
                        console.log('outside click!');
                        let opt = calc_opt(e.latlng.lat, e.latlng.lng, geojs);
                        console.log(opt);
                        if (calc_dist(e.latlng.lat, e.latlng.lng, opt) < MAX_DIST) {
                            let mkr = mkr_map.get(opt.geometry.coordinates[1], opt.geometry.coordinates[0]);
                            console.log(mkr);
                            mkr.bindPopup(gen_vue_comp(opt)).openPopup();
                        }
                    });
                })()
            }
            class hashmap{
                constructor() {
                    this.array = [];
                    for(var i = 0; i<100; i++)
                        this.array.push(new linkedlist());
                }
                // easier version of ieee 754
                // implement tolerance of 0.01 lat/lng in any direction (circular)
                conv(num) {
                    let aux = num;
                    let hash = 0;
                    let lim = Math.floor(Math.log(num)/Math.LN2);
                    for(var i = lim; i>lim-30; i--) {
                        let val = Math.pow(2,i);
                        hash << 1;
                        hash += (aux >= val) ? 1 : 0;
                        if(aux >= val) {
                            aux -= val;
                        }
                    }
                    return hash;
                }
                hash(lat,lng) {
                    return this.conv(Math.abs(lat))*this.conv(Math.abs(lng))%100;
                }
                add(lat,lng,mkr) {
                    this.array[this.hash(lat,lng)].add(mkr);
                }
                get(lat,lng) {
                    let list = this.array[this.hash(lat,lng)];
                    let pt = list.root;
                    let ctr = 0;
                    while(typeof pt.geojs !== 'undefined') {
                        if(pt.geojs._latlng.lat=== lat && pt.geojs._latlng.lng === lng) {
                            return pt.geojs;
                        }
                        pt = pt.ptr;
                    }
                    return null;
                }
            }
            function manage(mkr, stat) {
                let st = '';
                switch(stat) {
                    case 'minor': st='yellow'; break;
                    case 'moderate': st='red'; break;
                    case 'major': st='purple'; break;
                }
                let uri = `picture_${st}.png`;
                let icon = L.icon({
                    iconUrl: uri,
                    shadowUrl: uri,
                    iconSize:     [30, 30],
                    shadowSize:   [0, 0],
                    popupAnchor:  [0, -15]
                });
                mkr.setIcon(icon);
            }
            function gen_string(geo_jsn) {
                return `<p>${geo_jsn.properties.location}, ${geo_jsn.properties.state}</p>
						     <p>Reading: ${geo_jsn.properties.observed}</p>
						     <p>Location: ${geo_jsn.properties.location}</p>
							 <p>Time: ${geo_jsn.properties.obstime}</p>
							 <p>Status: ${geo_jsn.properties.status}</p>`;
            }
            function gen_vue_comp(geo_jsn) {
                var v = new Vue({
                    data(){
                        return {
                            message: gen_string(geo_jsn)
                        }
                    }
                });
                return v.message;
            }
            class linkedlist {
                constructor(){
                    this.root = new node(undefined,undefined);
                    this.ptr = this.root;
                    this.size = 0;
                }
                add(geo_inf){
                    this.ptr.geojs = geo_inf;
                    this.ptr.ptr = new node(undefined,undefined);
                    this.ptr = this.ptr.ptr;
                    this.size++;
                }
            }
            class node {
                constructor(n,geojs) {
                    this.ptr = n;
                    this.geojs = geojs;
                }
            }
            class pop_data {
                constructor(loc,state,obv,water,time,stat) {
                    this.loc = loc;
                    this.state = state;
                    this.obv = obv;
                    this.water = water;
                    this.time = time;
                    this.stat = stat;
                }
            }

            //unable to fill polygons
            esriSnowLayer = esri.featureLayer({
                url: 'http://cumulus.tnc.org/arcgis/rest/services/Atlas/FreshwaterMaps/MapServer/1',
                simplifyFactor: .5,
                precision: 10,
                //may need to use a different property in order to fill polygons correctly
                style: function (feature) {
                    if(feature.properties.Snow_map === 'earlier by over 3 weeks')
                        return {fillColor: "#003F8C", fillOpacity: '1.0', color:'black', weight:1};//, fill_opacity: .99};//, weight: 2, opacity: 255
                    else if (feature.properties.Snow_map === 'earlier by 2 to 3 weeks')
                        return {fillColor: '#4585C4', fillOpacity: '1.0', color:'black', weight:1};

                    else if(feature.properties.Snow_map === 'earlier by 1 to 2 weeks')
                        return {fillColor: '#7DB5FA', fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.Snow_map === 'less than a week')
                        return {fillColor: '#BED2FF', fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.Snow_map === 'later by over a week')
                        return {fillColor: '#BED2FF', fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.Snow_map === 'other')
                        return {fillColor: '#AAAAAA', fillOpacity: '1.0', color:'black', weight:1};
                    else
                        return {fillColor: '#E1E1E1', fillOpacity: '1.0', color:'black', weight:1};


                }

            }).addTo(movesMap);

            movesMap.removeLayer(esriSnowLayer);


            precipitationLayer = esri.featureLayer({
                url: 'https://cumulus.tnc.org/arcgis/rest/services/Atlas/TerrestrialMaps/MapServer/22',
                simplifyFactor: .5,
                precision: 10,
                //may need to use a different property in order to fill polygons correctly
                style: function (feature) {
                    if(feature.properties.precip2050 >23.2)
                        return {fillColor: "#0090cd", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >15.7)
                        return {fillColor: "#4ca4b8", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >10.3)
                        return {fillColor: "#80bba4", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >6.2)
                        return {fillColor: "#a9d18b", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >3.2)
                        return {fillColor: "#d2e96e", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >0.1)
                        return {fillColor: "#e6f6af", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >-2.2)
                        return {fillColor: "#ffd224", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >-6.5)
                        return {fillColor: "#ffa300", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >-9.2)
                        return {fillColor: "#ff7300", fillOpacity: '1.0', color:'black', weight:1};
                    else if(feature.properties.precip2050 >-12.4)
                        return {fillColor: "#ff3700", fillOpacity: '1.0', color:'black', weight:1};
                    else
                        return {fillColor: '#fa0000', fillOpacity: '1.0', color:'black', weight:1};


                }

            }).addTo(movesMap);

            movesMap.removeLayer(precipitationLayer);

            //document.getElementById("esriSnowLayer").visibilty = "hidden";

            /*            geoJsonQPF_Day1 = L.geoJson(qpfDay1,
                            {
                                style: function(feature) {
                                    switch (feature.properties.QPF) {
                                        case 0.010000: return {color: "#79FA00",fillOpacity:0.45,weight: 0.2};
                                        case 0.100000: return {color: "#00CF00",fillOpacity:0.45,weight: 0.2};
                                        case 0.250000: return {color: "#008C00",fillOpacity:0.45,weight: 0.2};
                                        case 0.500000: return {color: "#114B8D",fillOpacity:0.45,weight: 0.2};
                                        case 0.750000: return {color: "#1E90FF",fillOpacity:0.45,weight: 0.2};
                                        case 1.000000: return {color: "#00B2EE",fillOpacity:0.45,weight: 0.2};
                                        case 1.250000: return {color: "#00EEEE",fillOpacity:0.45,weight: 0.2};
                                        case 1.500000: return {color: "#8967CC",fillOpacity:0.45,weight: 0.2};
                                        case 1.750000: return {color: "#9133EE",fillOpacity:0.45,weight: 0.2};
                                        case 2.000000: return {color: "#8B1E8B",fillOpacity:0.45,weight: 0.2};
                                        case 2.500000: return {color: "#8A0F00",fillOpacity:0.45,weight: 0.2};
                                        case 3.000000: return {color: "#CE1C00",fillOpacity:0.45,weight: 0.2};
                                        case 4.000000: return {color: "#ED4000",fillOpacity:0.45,weight: 0.2};
                                        case 5.000000: return {color: "#FF7F00",fillOpacity:0.45,weight: 0.2};
                                        case 7.000000: return {color: "#CE8500",fillOpacity:0.45,weight: 0.2};
                                        case 10.000000: return {color: "#FFD700",fillOpacity:0.45,weight: 0.2};
                                        case 15.000000: return {color: "#FFFB00",fillOpacity:0.45,weight: 0.2};
                                        case 20.000000: return {color: "#FFAEB8",fillOpacity:0.45,weight: 0.2};
                                        default:
                                            return {color: '#00008A'};
                                        //break;
                                    }
                                }
                            });
                        geoJsonQPF_Day2 = L.geoJson(qpfDay2,
                            {
                                style: function(feature) {
                                    switch (feature.properties.QPF) {
                                        case 0.010000: return {color: "#79FA00",fillOpacity:0.45,weight: 0.2};
                                        case 0.100000: return {color: "#00CF00",fillOpacity:0.45,weight: 0.2};
                                        case 0.250000: return {color: "#008C00",fillOpacity:0.45,weight: 0.2};
                                        case 0.500000: return {color: "#114B8D",fillOpacity:0.45,weight: 0.2};
                                        case 0.750000: return {color: "#1E90FF",fillOpacity:0.45,weight: 0.2};
                                        case 1.000000: return {color: "#00B2EE",fillOpacity:0.45,weight: 0.2};
                                        case 1.250000: return {color: "#00EEEE",fillOpacity:0.45,weight: 0.2};
                                        case 1.500000: return {color: "#8967CC",fillOpacity:0.45,weight: 0.2};
                                        case 1.750000: return {color: "#9133EE",fillOpacity:0.45,weight: 0.2};
                                        case 2.000000: return {color: "#8B1E8B",fillOpacity:0.45,weight: 0.2};
                                        case 2.500000: return {color: "#8A0F00",fillOpacity:0.45,weight: 0.2};
                                        case 3.000000: return {color: "#CE1C00",fillOpacity:0.45,weight: 0.2};
                                        case 4.000000: return {color: "#ED4000",fillOpacity:0.45,weight: 0.2};
                                        case 5.000000: return {color: "#FF7F00",fillOpacity:0.45,weight: 0.2};
                                        case 7.000000: return {color: "#CE8500",fillOpacity:0.45,weight: 0.2};
                                        case 10.000000: return {color: "#FFD700",fillOpacity:0.45,weight: 0.2};
                                        case 15.000000: return {color: "#FFFB00",fillOpacity:0.45,weight: 0.2};
                                        case 20.000000: return {color: "#FFAEB8",fillOpacity:0.45,weight: 0.2};
                                        default:
                                            return {color: '#00008A'};
                                        //break;
                                    }
                                }
                            });*/
            // let lineTornado = turf.lineString([[-95.402527,31.264172],[-95.39566,31.299382],[-95.354462,31.32754],[-95.333862,31.354517],[-95.310516,31.386175],
            //     [-95.292664,31.407275],[-95.266571,31.429542],[-95.248718,31.455318],[-95.225372,31.488114],[-95.204773,31.517386],[-95.19516,31.527922],
            //     [-95.185547,31.540797],[-95.175934,31.554841],[-95.169067,31.573563],[-95.159454,31.586432],[-95.145721,31.60046],[-95.126495,31.613335],
            //     [-95.111389,31.633214],[-95.09491,31.649582],[-95.081177,31.662441],[-95.059204,31.678804],[-95.044098,31.688153],[-95.026245,31.703343],
            //     [-95.011139,31.71853],[-94.991913,31.727875],[-94.976807,31.745394],[-94.964447,31.760575]],{name:'Alto Callout Track'});
            //let polyFootprint = turf.polygon([[[-95.767822, 32.109333],[-93.169556, 32.503971],[-92.872925, 31.023517],[-95.443726, 30.63673],[-95.767822, 32.109333]]],{name:'Sentinel 1 Footprint'});
            //[-95.8122343032567,30.6096779992903],[-92.8304563806788,32.5241675328058]
            //let bbox = turf.bbox(polyFootprint);
            //let bufferedTornadoTrack = turf.buffer(lineTornado,3,{units:'miles'});
            //console.log(bufferedTornadoTrack);
            //let maskedTrack = turf.mask(bufferedTornadoTrack,polyFootprint,{name:'Alto Mask'});
            //maskedTrack.properties.name = 'Alto Mask';
            // maskingSentinelApr16 = L.geoJSON(maskedTrack, {
            //     style: function (feature) {
            //         return {
            //             color: 'grey',
            //             opacity: 1,
            //             fillOpacity:0.8,
            //         };
            //     }
            // }).bindPopup(function (layer) {
            //     return layer.feature.properties.name;
            // });
        },
        created(){
            //Menu Components used to pass over Global Event hub these events from buttons
            this.$eventHub.$on('toggleMapLayers', this.toggleLayer);
            this.$eventHub.$on('resetMap',this.resetMap);
            this.$eventHub.$on('goToBookmarks',this.goToBookmark);
            this.$eventHub.$on('goToLocation',this.goToLocation);
            //this.$eventHub.$on('goToLocation',this.goToNamedLocation);
            this.$eventHub.$on('gatheringMapInfo',this.getMapInfo);
            this.$eventHub.$on('redrawMap',this.redrawMap);
            //toggleMaskTornado20190416
            //this.$eventHub.$on('toggleMaskTornado20190416', this.addRemoveMaskTornado);
            this.$eventHub.$on('togglemLayer', this.changeLayer); //add function to call
            // this.$eventHub.$on('layerOff', this.layerOff); // add function to call
            this.$eventHub.$on('opacitySnow', this.changeOpacity);
            this.$eventHub.$on('opacityRain', this.changeOpacity);
            this.$eventHub.$on('opacityPop', this.changeOpacity);
            this.$eventHub.$on('opacityPrecip', this.changeOpacity);
            this.$eventHub.$on('search_query', process_search);
            this.$eventHub.$on('layer-on', set_layerOn);
        }
    }
    function set_layerOn() {
        console.log('layer 2 reference changed!');
        layer_2 = !layer_2;
    }
    //
    function changeOpacity(opacity, layer){
        let newFill = opacity/100;
        if(layer==="esriSnowLayer"){
            esriSnowLayer.setStyle({fillOpacity:newFill, opacity:newFill});
        } else if(layer==="precipitationLayer"){
            precipitationLayer.setStyle({fillOpacity:newFill, opacity:newFill});
        } else if(layer==="popDenseLayer") {
            popDenseLayer.setStyle({fillOpacity: newFill, opacity: newFill});
        }
        //  else {
        //     gaugeLayer.setStyle({fillOpacity:newFill, opacity:newFill});
        // }
    }
    // query by latitude,longitude ONLY
    function process_search(query) {
        const key = 'taflMXnW81xKAuwS0kIC5tAHtoNjGcmh';
        (async () => {
            const response = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${query}`);
            let latlng = response.data.results[0].locations[0].latLng;
            if(layer_2) {
                let opt = calc_opt(latlng.lat,latlng.lng,gauge_geojs);
                movesMap.setView(L.latLng(opt.properties.lat_node, opt.properties.lng_node),11);
            } else {
                movesMap.setView(L.latLng(latlng.lat, latlng.lng), 11);
            }
        })();
    }
    function calc_opt(x,y,geojs) {
        let min = 1000000000;
        let opt = undefined;
        for(let j = 0; j<geojs.length; ++j) {
            let val = calc_dist(x,y,geojs[j]);
            if(min > val) {
                if(min == 0) continue;
                min = val;
                opt = geojs[j];
            }
        }
        return opt;
    }
    function calc_dist(x,y,g2) {
        let dx = g2.properties.lat_node-x;
        let dy = g2.properties.lng_node-y;
        return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    }

    function changeLayer(layer) {
        if(layer[2]){
            movesMap.removeLayer(getLayer(layer[3]));
        }
        else{
            movesMap.addLayer(getLayer(layer[3]));
        }
    }

        //document.getElementById(layer).visibility = "visible";
        //not working

    function getLayer(layerName){
        console.log("layer name get function started");
        if(layerName=="esriSnowLayer"){
            return esriSnowLayer;
        }
        else if(layerName=="popDenseLayer"){
            return popDenseLayer;
        }
        else if(layerName=="rainGaugesLayer"){
            return gaugeLayer;
        }
        else if(layerName=="precipitationLayer"){
            return precipitationLayer;
        }
        else{
            return null;
        }
    }

    function resetMap(){
        movesMap.setView([38.3117, -98.77774], 5);
        movesMap.invalidateSize();
    }
    function redrawMap(){
        console.log('Here');
        movesMap.invalidateSize();
    }
    function getMapInfo(){
        const LatLngAry = [movesMap.getCenter().lat,movesMap.getCenter().lng];
        let mapInfoObj = {ZoomLevel:movesMap.getZoom(),LatLng:LatLngAry};
        //movesMap.setView([32.3117, -99.77774], 6);
        //TODO:Convert to Vuex BAP 04-03-19
        this.$eventHub.$emit('returnedMapInfo',mapInfoObj);
    }
    // function addRemoveMaskTornado(){
    //     if(movesMap.hasLayer(maskingSentinelApr16)){
    //         movesMap.removeLayer(maskingSentinelApr16);
    //     } else {
    //         movesMap.addLayer(maskingSentinelApr16);
    //     }
    // }
    function goToLocation(incomingObj){
        console.log("Go To Location");
        console.log(incomingObj);
        console.log(incomingObj.LatLng);
        const LatLngAry = [incomingObj.LatLng[0],incomingObj.LatLng[1]];
        console.log(LatLngAry);
        movesMap.setView(LatLngAry,incomingObj.ZoomLevel);
        movesMap.invalidateSize();
    }
    function goToBookmark(incomingBookmark) {
        if (incomingBookmark === 'California') {
            movesMap.setView([36.7783, -119.4179], 6);
        } else if (incomingBookmark === 'Florida') {
            movesMap.setView([27.6648, -81.5158], 6);
        } else if (incomingBookmark === 'Texas') {
            movesMap.setView([32.3117, -99.77774], 6);
        } else if(incomingBookmark === 'Port Arthur') {
            movesMap.setView([29.945527, -93.924437], 14);
        }
        else {
            movesMap.setView([38.3117, -98.77774], 5);
            // } else if (incomingBookmark==='westTx'){
            //     movesMap.setView([30.721768, -103.447266], 8);
            // } else if (incomingBookmark==='centralTx'){
            //     movesMap.setView([30.229408, -98.146362], 8);
            // }
            //movesMap.resetMap();
            //movesMap.invalidateSize();
        }
    }

    function toggleLayer(incomingLayer) {
        //console.log(incomingLayer);
        //console.log(esriToposLayer);
        if (incomingLayer === 'topo') {
            console.log(incomingLayer);
            if (!movesMap.hasLayer(esriToposLayer)) {
                movesMap.addLayer(esriToposLayer);
            }
            checkRemoveAerials();
            checkRemoveStreets();
            checkRemoveGoogleWMTS();
        } else if (incomingLayer === 'aerials') {
            if (movesMap.hasLayer(esriAerialsLayer)) {
                if (!movesMap.hasLayer(esriToposLayer)) {
                    movesMap.addLayer(esriToposLayer);
                }
                checkRemoveStreets();
                checkRemoveAerials();
                checkRemoveGoogleWMTS();
            } else {
                checkRemoveGoogleWMTS();
                movesMap.addLayer(esriAerialsLayer);
                movesMap.addLayer(esriAerialsLabels);
                checkRemoveTopo();
                checkRemoveStreets();
            }
        } else if (incomingLayer === 'streets') {
            if (movesMap.hasLayer(esriStreetsLayer)) {
                if (!movesMap.hasLayer(esriToposLayer)) {
                    movesMap.addLayer(esriToposLayer);
                }
                checkRemoveStreets();
                checkRemoveGoogleWMTS();
                checkRemoveAerials();
            } else {
                movesMap.addLayer(esriStreetsLayer);
                checkRemoveGoogleWMTS();
                checkRemoveTopo();
                checkRemoveAerials();
            }
        } else if (incomingLayer === 'streets') {
            if (movesMap.hasLayer(esriStreetsLayer)) {
                if (!movesMap.hasLayer(esriToposLayer)) {
                    movesMap.addLayer(esriToposLayer);
                }
                checkRemoveStreets();
                checkRemoveGoogleWMTS();
                checkRemoveAerials();
            } else {
                movesMap.addLayer(esriStreetsLayer);
                checkRemoveGoogleWMTS();
                checkRemoveTopo();
                checkRemoveAerials();
            }
        } else if (incomingLayer === 'reset') {
            //console.log('Reset');
            if (!movesMap.hasLayer(esriToposLayer)) {
                movesMap.addLayer(esriToposLayer);
                checkRemoveAerials();
                checkRemoveStreets();
                checkRemoveGoogleWMTS();
            }
            movesMap.setView([32.3117, -99.77774], 6);
        } else if (incomingLayer === 'google') {
            if (movesMap.hasLayer(googleImageryLayer)) {
                movesMap.removeLayer(googleImageryLayer);
                checkRemoveLabelsOnly();
                checkRemoveAerials();
                if (!movesMap.hasLayer(esriToposLayer)) {
                    movesMap.addLayer(esriToposLayer);
                }
                //console.log("Am I here?");
            } else {
                if (!movesMap.hasLayer(esriToposLayer)) {
                    movesMap.addLayer(esriToposLayer);
                }
                movesMap.addLayer(googleImageryLayer);
                checkRemoveAerials();
                checkRemoveStreets();
                if (!movesMap.hasLayer(esriAerialsLabels)) {
                    movesMap.addLayer(esriAerialsLabels);
                    //movesMap.bringToFront(esriAerialsLabels);
                }
            }
        }
    }

    function checkRemoveLabelsOnly() {
        if (movesMap.hasLayer(esriAerialsLabels)) {
            movesMap.removeLayer(esriAerialsLabels);
        }
    }

    function checkRemoveAerials() {
        if (movesMap.hasLayer(esriAerialsLayer)) {
            movesMap.removeLayer(esriAerialsLayer);
            movesMap.removeLayer(esriAerialsLabels);
        }
    }

    function checkRemoveStreets() {
        if (movesMap.hasLayer(esriStreetsLayer)) {
            movesMap.removeLayer(esriStreetsLayer);
        }
    }

    function checkRemoveTopo() {
        if (movesMap.hasLayer(esriToposLayer)) {
            movesMap.removeLayer(esriToposLayer);
        }
    }

    function checkRemoveGoogleWMTS() {
        if (movesMap.hasLayer(googleImageryLayer)) {
            movesMap.removeLayer(googleImageryLayer);
        }
        checkRemoveLabelsOnly();

    }



</script>
<style>
    #mapTexas{
        width: 100%;
        height: inherit;
        position: absolute;
        top: 30px;
        right: 0px;
    }
    .leaflet-left .leaflet-control {
        margin-left: 100px !important; /*3750%*/
    }

    .leaflet-top .leaflet-control {
        margin-top: 60px !important;
    }




</style>
