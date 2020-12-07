<template>
    <div class="title" :class="showLine?'line':''">
        {{title}}
        <i v-if="showMore" class="more"></i>
    </div>
</template>

<style lang="less" scoped>
.title {
    font-size: 1rem;
    color: #fff;
    height: 21px;
    line-height: 21px;
    margin-bottom: 20px;
    text-align: left;
    &.line {
        &::before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 21px;
            background: #1761ca;
            margin-right: 10px;
            vertical-align: -4px;
        }
    }
    i.more {
        width: 24px;
        height: 24px;
        float: right;
        border-radius: 24px;
        position: relative;
        cursor: pointer;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 24px;
            height: 24px;
            background: url("../assets/img/more.png") no-repeat;
            background-size: 100% 100%;
        }
        &:hover {
            animation-timing-function: ease-in-out;
            animation-name: breathe;
            animation-duration: 800ms;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
    }
}

@keyframes breathe {
    0% {
        box-shadow: 0 0 25px rgba(255, 255, 255, 0);
    }
    100% {
        box-shadow: 0 0 25px rgba(255, 255, 255, 1);
    }
}
</style>
<script>
export default {
    data() {
        return {};
    },
    props: ["title", "showLine", "showMore"],
};
</script>