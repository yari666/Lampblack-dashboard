<template>
    <div id="main">
        <top :fullMap="fullMap"></top>
        <middle :fullMap="fullMap" @fullScreen="fullScreen"></middle>
        <foot :fullMap="fullMap"></foot>
    </div>
</template>

<style lang="less" scope>
#main {
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bg.jpg) no-repeat;
    background-size: 100% 100%;
}
</style>

<script>
import top from "../top";
import middle from "./middle";
import foot from "./footer";

export default {
    data() {
        return {
            fullMap: false,
        };
    },
    components: { top, middle, foot },
    methods: {
        fullScreen() {
            this.fullMap = !this.fullMap;
        },
    },
};
</script>
