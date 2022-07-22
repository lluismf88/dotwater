<template>
    <div id="header">
        <div>DOT WATER</div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#header {
    @include background(
        $image: img("logo-w.png"),
        $position: center left 25px,
        $size: 25px
    );
    background-color: $main;
    position: fixed;
    width: 100%;
    height: $menu-top-height;
    top: 0;
    padding-left: 60px;
    line-height: $menu-top-height;
}
</style>
