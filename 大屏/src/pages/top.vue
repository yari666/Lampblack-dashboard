<template>
    <div
        class="top animate__animated"
        :class="fullMap?'animate__fadeOutUpBig':'animate__fadeInDownBig'"
    >
        <div class="date">
            <i class="el-icon-date"></i>
            {{nowDate}}
        </div>

        <h1>餐饮业油烟管理平台</h1>

        <ul class="tools">
            <li>
                <img class="img1" src="../assets/img/btn_home.png" />
            </li>
            <li>
                <img class="img1" src="../assets/img/btn_set.png" />
            </li>
        </ul>
    </div>
</template>

<script>
const timestamp = require("time-stamp");

export default {
    data() {
        return {
            nowDate: timestamp("YYYY年MM月DD日 HH:mm:ss"),
        };
    },
    props: {
        fullMap: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less" scoped>
.top {
    width: 100%;
    height: 65px;
    line-height: 65px;
    color: #fff;
    background: url(http://test.soot.xhs-sz.com/img/top.png) center no-repeat;
    background-size: cover;
    background-color: #042159;
    font-style: "微软雅黑";
    position: relative;
    h1 {
        text-align: center;
        font-weight: 300;
        font-size: 26px;
        letter-spacing: 4px;
    }
    .date {
        color: #5e8dac;
        position: absolute;
        left: 1.5%;
        i {
            font-size: 20px;
        }
    }
    ul {
        position: absolute;
        right: 1.5%;
        top: 10px;
        li {
            float: left;
            margin: 0 10px;
            img {
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>

