<template>
    <div id="content">
        <div id="fullcontent" :class="{ full: !isWindowOpen }">
            <router-view />
        </div>
        <AddPoint id="add-point-menu" v-if="isAddPointOpen"></AddPoint>
    </div>
</template>

<script>
import AddPoint from "@/components/layouts/default/AddPoint";
export default {
    components: { AddPoint },
    data() {
        return {};
    },
    computed: {
        isWindowOpen() {
            return this.isAddPointOpen || this.isMenuOpen;
        },
        isMenuOpen() {
            return this.$store.getters.isMenuOpen;
        },
        isAddPointOpen() {
            return this.$store.getters.isAddPointOpen;
        },
    },
};
</script>

<style lang="scss" scoped>
#content {
    margin-top: $menu-top-height;
    width: 100%;
    height: calc(100% - #{$menu-top-height} - #{$footer-height});
    display: inline-block;

    #fullcontent {
        position: fixed;
        height: calc(100% - #{$menu-top-height} - #{$footer-height});
        min-width: calc(100% - 350px);

        &.full {
            width: 100%;
        }
    }

    #add-point-menu {
        position: fixed;
        height: calc(100% - #{$menu-top-height} - #{$footer-height});
        max-width: 350px;
        right: 0;
    }
}
</style>
