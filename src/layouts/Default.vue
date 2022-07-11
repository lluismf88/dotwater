<template>
    <div id="def-layout">
        <Header></Header>
        <Content id="content"></Content>
    </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue";
import Content from "@/components/layouts/Content.vue";
export default {
    name: "Default-Layout",
    components: { Header, Content },
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
#def-layout {
    background-color: $default-bg-color;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
    position: relative;

    #content {
        margin-top: $menu-top-height;
    }
}
</style>
