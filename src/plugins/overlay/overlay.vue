<template>
    <div name="modal" :class="type">
        <div
            id="loading"
            :class="['loading', { blocking: blocking }, typeImage]"
            v-if="loading && show && type != 'print'"
            @click="onClick"
            :style="[{ backgroundColor: color }, styles]"
        >
            <p
                v-if="message != '' && !timeout.action.show"
                class="message"
                v-html="message"
            ></p>
            <div v-if="timeout.action.show" class="redirect">
                <p
                    v-if="timeout.action.message"
                    v-html="timeout.action.message"
                ></p>
                <button @click="timeoutAction">
                    {{ timeout.action.actionText }}
                </button>
            </div>
        </div>
        <!-- <lottie-animation ref="anim" id="loading" class="print-overlay" v-if="loading && show && type != 'print'" :animationData="require('../../../public/img/lottie/food.json')" /> -->
        <div
            id="overlay"
            :class="{ blocking: blocking }"
            v-else-if="show && type != 'print'"
            @click="onClick"
            :style="[{ backgroundColor: color }, styles]"
        ></div>
    </div>
</template>
<script>
import store from "@/store";
import router from "@/router";
// import i18n from '@/i18n'
// import LottieAnimation from 'lottie-web-vue'
export default {
    components: {
        // LottieAnimation
    },
    data() {
        return {
            type: "default",
            show: false,
            typeImage: false,
            closable: true,
            loading: false,
            color: "000000cc",
            message: "",
            blocking: false,
            dPrint: {},
            styles: {},
            timeoutActive: false,
            timeout: {
                timing: 90000,
                autoredirect: false,
                action: {
                    // actionText: i18n.t('assets.overlay.timeout.actionText'),
                    // message: i18n.t('assets.overlay.timeout.message'),
                    show: false,
                    url: "/home",
                    callAction: function () {},
                },
            },
            callClick: null,
        };
    },
    methods: {
        onClick(event) {
            if (this.callClick && typeof this.callClick === "function") {
                this.callClick(this, store);
            } else {
                if (!this.closable) {
                    return;
                }
                this.selfClose();
            }
        },
        selfClose() {
            this.show = false;
            this.timeout.action.show = false;
            this.clearSelfClose();
            document.body.style.overflow = "auto";
        },
        startSelfClose() {
            var self = this;
            clearTimeout(this.timeoutActive);
            self.timeout.action.show = false;
            this.timeoutActive = setTimeout(function () {
                if (self.timeout.autoredirect) {
                    self.timeoutAction();
                } else {
                    self.timeout.action.show = true;
                }
            }, self.timeout.timing);
        },
        timeoutAction() {
            let self = this;
            self.timeout.action.callAction();
            router.push(self.redirectPath(self.timeout.action.url));
            self.selfClose();
        },
        clearSelfClose() {
            this.timeout.action.show = false;
            clearTimeout(this.timeoutActive);
        },
        redirectPath(firstResult) {
            var visible = [];
            var tools = store.getters["getTools"];
            var result = firstResult;
            const config = store.getters["login/getConfig"];
            if (config.tools) {
                visible = config.tools;
            }
            if (visible.length == 1) {
                result = tools[visible[0]].href;
            }
            return result;
        },
    },
    created() {
        this.clearSelfClose();
    },
    mounted() {
        let self = this;
        if (self.loading) {
            self.startSelfClose();
        }
    },
    beforeDestroy() {
        let self = this;
        // if (self.loading) {
        self.clearSelfClose();
        // }
    },
};
</script>
<style lang="scss">
#overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: $z-overlay-default;
    // z-index: 80800000000000;
    &.blocking {
        z-index: $z-overlay-blocking;
        // z-index: 80800000000000;
    }
}
#loading {
    @include background(
        $image: (
            img("loader_light.svg"),
            none,
        ),
        $color: rgba(0, 0, 0, 0.8),
        $size: (
            100px,
            cover,
        )
    );
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: $z-overlay-default + 1;
    // z-index: 80800000000000;
    &.blocking {
        z-index: $z-overlay-blocking + 10;
        // z-index: 80800000000000;
    }
    img {
        position: fixed;
        width: 200px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin-top: -50px; /* Negative half of height. */
        margin-left: -100px; /* Negative half of width. */
    }
    .message {
        position: fixed;
        width: calc(100% - 50px);
        height: auto;
        top: calc(50% + 120px);
        left: 50px;
        margin-top: -50px; /* Negative half of height. */
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        padding-right: 50px;
        @include font-size(l);
        font-family: $conden-light;
    }
    .redirect {
        position: fixed;
        width: calc(100% - 50px);
        height: auto;
        top: calc(50% + 120px);
        left: 50px;
        margin-top: -50px; /* Negative half of height. */
        text-align: center;
        padding-right: 50px;
        > p {
            @include font-size(l);
            font-family: $conden-light;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            display: block;
            width: 80%;
            margin: 0 auto 24px auto;
        }
        > button {
            @include background($color: #fff);
            @include border-radius(3px);
            @include font-size(ml);
            font-family: $conden-bold;
            color: $main;
            padding: 6px 9px;
        }
    }
    &.loading {
        @include background(
            $image: (
                img("loader_light.svg"),
                none,
            ),
            $color: rgba(0, 0, 0, 0.8),
            $size: (
                100px,
                cover,
            )
        );
    }
    &.checklist {
        @include background(
            $image: (
                img("checklist_loader.gif"),
                none,
            ),
            $color: rgba(0, 0, 0, 0.8),
            $size: (
                100px,
                cover,
            )
        );
    }
    &.library {
        @include background(
            $image: (
                img("library_loader.gif"),
                none,
            ),
            $color: rgba(0, 0, 0, 0.8),
            $size: (
                100px,
                cover,
            )
        );
    }
    &.logbooksend {
        @include background(
            $image: (
                img("logbook_loader_send.gif"),
                none,
            ),
            $color: rgba(0, 0, 0, 0.8),
            $size: (
                100px,
                cover,
            )
        );
    }
}
.print {
    #overlay,
    #loading {
        // background-color: rgba(255,255,255,0.8);
        @include display-flex();
        @include justify-content();
        @include align-items();
        @include flex-direction(column);
        .message {
            @include font-size(ml);
            font-family: $text-bold;
            color: #fff;
            text-align: center;
            margin: 0 auto;
            display: block;
            width: 100%;
        }
        .label-box {
            @include border-radius($default-border-radius);
            @include background($color: #fff);
            display: block;
            margin: 0 auto;
            min-width: 300px;
            width: auto;
            max-width: 60%;
            max-height: 80vh;
            overflow: auto;
            .line {
                display: block;
                width: 100%;
                .label,
                .value {
                    display: inline-block;
                    min-width: 200px;
                    width: auto;
                    padding: 6px;
                }
                .label {
                    display: inline-block;
                    max-width: 30%;
                    text-align: right;
                    text-transform: capitalize;
                    &:first-of-type {
                        // display: none;
                    }
                }
                .value {
                    display: inline-block;
                    max-width: 70%;
                    font-family: $text-bold;
                    &:first-of-type {
                        font-family: $text;
                    }
                }
            }
        }
    }
}
</style>
