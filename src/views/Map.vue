<template>
    <div id="map">
        <GmapMap
            :center="center"
            :zoom="7"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
            :options="mapOptions"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @click="center = m.position"
            />
        </GmapMap>
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
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUI: false,
            },
            center: { lat: 10, lng: 10 },
        };
    },
    computed: {
        markers() {
            return [
                {
                    position: { lat: 30, lng: 30 },
                },
                {
                    position: { lat: 10, lng: 10 },
                },
            ];
        },
    },
    created() {
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
}
</style>
