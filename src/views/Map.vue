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
