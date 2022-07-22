<template>
    <div id="def-layout">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue";
import Content from "@/components/layouts/Content.vue";
import Footer from "@/components/layouts/Footer.vue";

export default {
    name: "Default-Layout",
    components: { Header, Content, Footer },
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
}
</style>
