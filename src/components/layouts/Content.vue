<template>
    <div id="content">
        <div id="fullcontent" :class="{ full: !menu_open }">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu_open: false,
        };
    },
};
</script>

<style lang="scss" scoped>
#content {
    margin-top: $menu-top-height;
    width: 100%;
    height: calc(100% - #{$menu-top-height} - #{$footer-height});

    #fullcontent {
        position: fixed;
        height: calc(100% - #{$menu-top-height});
        min-width: calc(100% - 350px);

        &.full {
            width: 100%;
        }
    }
}
</style>
