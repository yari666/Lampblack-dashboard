<template>
    <div class="middle">
        <div
            class="left animate__animated"
            :class="fullMap?'animate__fadeOutLeftBig':'animate__fadeInLeftBig'"
        >
            <dv-border-box-1 backgroundColor="rgba(0,38,101,0.64)">
                <middle-left-box></middle-left-box>
            </dv-border-box-1>
        </div>
        <div class="center animate__animated" :class="fullMap?'full':''">
            <middle-center-box :fullMap="fullMap" @fullScreen="fullScreen"></middle-center-box>
        </div>
        <div
            class="right animate__animated"
            :class="fullMap?'animate__fadeOutRightBig':'animate__fadeInRightBig'"
        >
            <dv-border-box-1 backgroundColor="rgba(0,38,101,0.64)">
                <middle-right-box></middle-right-box>
            </dv-border-box-1>
        </div>
    </div>
</template>

<script>
import middleLeftBox from "./middleLeftBox";
import middleCenterBox from "./middleCenterBox";
import middleRightBox from "./middleRightBox";

export default {
    data() {
        return {};
    },
    components: { middleLeftBox, middleCenterBox, middleRightBox },
    props: ["fullMap"],
    methods: {
        fullScreen() {
            this.$emit("fullScreen");
        },
    },
};
</script>

<style lang="less" scoped>
.middle {
    width: 100%;
    height: calc(~"60vh - 20px");
    margin-top: 20px;
}
.left {
    float: left;
    width: 23.5%;
    height: 100%;
    margin-left: 1.5%;
    box-sizing: border-box;
}
.center {
    width: calc(~"50% - 40px");
    height: calc(~"100% - 10px");
    float: left;
    margin: 5px 20px 0;
    box-sizing: border-box;
    &.full {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: big 0.2s ease-in-out;
        margin: 0;
    }
}

.right {
    width: 23.5%;
    height: 100%;
    float: right;
    margin-right: 1.5%;
    box-sizing: border-box;
}
</style>