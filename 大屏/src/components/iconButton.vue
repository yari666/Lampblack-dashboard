<template>
    <div class="iconButton" :style="{background: btnBackgroundColor}">
        <img :src="btnName" />
    </div>
</template>

<style lang="less" scoped>
.iconButton {
    padding: 3px;
    border-radius: 5px;
    overflow: hidden;
    float: left;
    img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
}
</style>

<script>
export default {
    props: ["btnName", "btnBackgroundColor"],
};
</script>