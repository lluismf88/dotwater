<template>
    <div id="addPoint">
        <div class="coords">
            <input type="number" v-model="currentPoint.lat" :disabled="true" />
            <input
                type="number"
                v-model="currentPoint.lng"
                @change="updateCurrentPoint"
                :disabled="true"
            />
        </div>
        <div class="actions">
            <button @click="savePoint">Guardar</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "AddPoint",
    computed: {
        currentPoint: {
            get() {
                return this.$store.getters["dot/getCurrentPoint"];
            },
            set(value) {
                console.log(value);
                this.$store.commit("dot/setCurrentPoint", value);
            },
        },
    },
    methods: {
        updateCurrentPoint(coords) {
            console.log("updateCurrentPoint", coords);
            const newCoord = {
                lat: parseFloat(coords.lat),
                lng: parseFloat(coords.lng),
            };

            this.currentPoint = newCoord;
        },

        savePoint() {
            var self = this;

            this.$overlay.loading();
            this.$store.dispatch("dot/addPoint", this.currentPoint).then(() => {
                self.$overlay.hide();
            });
        },
    },
};
</script>
<style lang="scss" scoped></style>
