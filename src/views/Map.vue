<template>
    <div id="map">
        <GmapMap
            :center="center"
            :zoom="7"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
            :options="mapOptions"
            @center_changed="updateCenter"
            @idle="sync"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :icon="m.icon"
                :clickable="true"
                :draggable="false"
                @click="center = m.position"
            />

            <GmapMarker
                key="center"
                :position="initPoint"
                :clickable="true"
                :draggable="false"
                @click="center = m.position"
            />
        </GmapMap>
        <div class="button act add">Añadir</div>
    </div>
</template>

<script>
export default {
    name: "HomeView",
    components: {},
    data() {
        return {
            mapOptions: {
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUI: false,
            },
            center: { lat: 10, lng: 10 },
            initPoint: { lat: 10, lng: 10 },
            reportedMapCenter: { lat: 10, lng: 10 },
            adding_point: false,
        };
    },
    computed: {
        markers() {
            return [
                {
                    position: { lat: 30, lng: 30 },
                    icon: {
                        url: "img/ico-map.png",
                        size: { width: 35, height: 50, f: "px", b: "px" },
                        scaledSize: { width: 35, height: 50, f: "px", b: "px" },
                    },
                },
                {
                    position: { lat: 10, lng: 10 },
                    icon: {
                        url: "img/ico-map.png",
                        size: { width: 35, height: 50, f: "px", b: "px" },
                        scaledSize: { width: 35, height: 50, f: "px", b: "px" },
                    },
                },
            ];
        },
    },
    methods: {
        updateCenter(latLng) {
            if (this.adding_point) {
                this.reportedMapCenter = {
                    lat: latLng.lat(),
                    lng: latLng.lng(),
                };
            }
        },
        sync() {
            this.center = this.reportedMapCenter;
        },
    },
    created() {
        var self = this;
        this.$overlay.loading();

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(pos) {
            var crd = pos.coords;

            console.log("Your current position is:");
            console.log("Latitude : " + crd.latitude);
            console.log("Longitude: " + crd.longitude);
            console.log("More or less " + crd.accuracy + " meters.");
            self.$overlay.hide();

            self.initPoint.lat = crd.latitude;
            self.initPoint.lng = crd.longitude;

            self.center = self.initPoint;
        }

        function error(err) {
            console.warn("ERROR(" + err.code + "): " + err.message);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    },
};
</script>
<style lang="scss" scoped>
#map {
    width: 100%;
    height: 100%;
    position: relative;
    background: red;

    .button {
        border-radius: 10px;
        padding: 10px 15px;
        background-color: $accent;
        color: #fff;
        position: fixed;
        bottom: 200px;
        right: 50px;
        cursor: pointer;

        &.add {
            @include background(
                $image: img("add_ffffff.svg"),
                $position: center left 10px,
                $size: 16px
            );

            font-weight: bold;
            font-size: 1.2em;
            padding-left: 40px;
        }
    }
}
</style>
