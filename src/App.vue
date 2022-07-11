<template>
    <div id="app">
        <template v-if="layout == 'default-layout'">
            <DefaultLayout></DefaultLayout>
        </template>
    </div>
</template>

<script>
const DefaultLayout = () => import("@/layouts/Default.vue");

export default {
    components: { DefaultLayout },
    data() {
        return {
            default_layout: "default",
        };
    },

    computed: {
        layout() {
            var layout =
                typeof this.$route.meta.layout !== "undefined"
                    ? this.$route.meta.layout
                    : this.default_layout;
            return layout + "-layout";
        },
    },
};
</script>

<style lang="scss">
@import "@/../public/css/variables.scss";
@import "@/../public/css/assets/_animations.scss";
@import "@/../public/css/main.scss";
@import "@/../public/css/_reset.scss";
@import "@/../public/css/_default.scss";
@import "@/../public/css/_fonts.scss";
@import "@/../public/css/style.scss";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
