<template>
    <div id="fullcontent">
        <router-view />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#fullcontent {
    position: fixed;
    width: 100%;
    height: calc(100% - $menu-top-height);
}
</style>
