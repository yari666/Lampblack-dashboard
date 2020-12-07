<template>
    <div class="middleCenterBox">
        <mapbox
            class="con"
            :mapdata="mapdata"
            :fullMap="fullMap"
            @clickMapPoint="clickMapPoint"
        ></mapbox>
        <map-con
            v-show="fullMap"
            @closeRight="closeRight"
            :showRight="showRight"
            :mapdata="mapdata"
            :mapIndex="mapIndex"
        ></map-con>

        <!-- 全屏弹框打开按钮 -->
        <div
            class="close animate__animated"
            :class="
                showRight
                    ? 'animate__fadeOutRightBig'
                    : 'animate__fadeInRightBig'
            "
            v-show="fullMap"
            @click="openRight"
        >
            <i class="el-icon-arrow-left"></i>
        </div>

        <div class="fullscreen" @click="full()">
            {{ fullMap ? "返回" : "全屏" }}
            <i class="el-icon-rank"></i>
        </div>

        <div
            class="con animate__animated"
            :class="
                fullMap ? 'animate__fadeOutDownBig' : 'animate__fadeInUpBig'
            "
        >
            <div class="btopleft"></div>
            <div class="btopright"></div>
            <div class="bbottomleft"></div>
            <div class="bbottomright"></div>

            <div class="status">
                <title-box
                    class="title"
                    :title="title"
                    :showLine="false"
                ></title-box>
                <ul>
                    <li>
                        <div class="circle">
                            <b>
                                <dv-decoration-9
                                    style="width: 105px; height: 105px"
                                >
                                    <countTo
                                        :startVal="0"
                                        :endVal="totalDevice"
                                        :duration="3000"
                                    ></countTo>
                                </dv-decoration-9>
                            </b>
                        </div>
                        <div class="btn status1">总数</div>
                    </li>
                    <li>
                        <div class="circle">
                            <b>
                                <dv-decoration-9
                                    style="width: 105px; height: 105px"
                                >
                                    <countTo
                                        :startVal="0"
                                        :endVal="totalNormalDevice"
                                        :duration="3000"
                                    ></countTo>
                                </dv-decoration-9>
                            </b>
                        </div>
                        <div class="btn status2" @click="clickEvent">正常</div>
                    </li>
                    <li>
                        <div class="circle">
                            <b>
                                <dv-decoration-9
                                    style="width: 105px; height: 105px"
                                >
                                    <countTo
                                        :startVal="0"
                                        :endVal="totalOfflineDevice"
                                        :duration="3000"
                                    ></countTo>
                                </dv-decoration-9>
                            </b>
                        </div>
                        <div class="btn status3">离线</div>
                    </li>
                    <li>
                        <div class="circle">
                            <b>
                                <dv-decoration-9
                                    style="width: 105px; height: 105px"
                                >
                                    <countTo
                                        :startVal="0"
                                        :endVal="totalExcessiveDevice"
                                        :duration="3000"
                                    ></countTo>
                                </dv-decoration-9>
                            </b>
                        </div>
                        <div class="btn status4">超标</div>
                    </li>
                    <li>
                        <div class="circle">
                            <b>
                                <dv-decoration-9
                                    style="width: 105px; height: 105px"
                                >
                                    <countTo
                                        :startVal="0"
                                        :endVal="totalAbnormalLinkageDevice"
                                        :duration="3000"
                                    ></countTo>
                                </dv-decoration-9>
                            </b>
                        </div>
                        <div class="btn status5">联动异常</div>
                    </li>
                    <li>
                        <div class="circle">
                            <b>
                                <dv-decoration-9
                                    style="width: 105px; height: 105px"
                                >
                                    <countTo
                                        :startVal="0"
                                        :endVal="totalOverdueDevice"
                                        :duration="3000"
                                    ></countTo>
                                </dv-decoration-9>
                            </b>
                        </div>
                        <div class="btn status6">超期</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
// let mapdata = require("../assets/newdata");

import mapbox from "../../components/map";
import titleBox from "../../components/title";
import mapCon from "../../components/mapCon";
import countTo from "vue-count-to";

export default {
    data() {
        return {
            title: "设备实时状态统计",
            showmap: false,
            showRight: false,
            token: window.localStorage.getItem("token"),
            timer: null, //定时器

            // 设备状态
            totalDevice: 0,
            totalNormalDevice: 0,
            totalOfflineDevice: 0,
            totalExcessiveDevice: 0,
            totalAbnormalLinkageDevice: 0,
            totalOverdueDevice: 0,

            // 地图信息
            mapdata: [],
            mapIndex: 0,
        };
    },
    props: ["fullMap"],
    components: { mapbox, titleBox, mapCon, countTo },
    created() {
        this.$nextTick(() => {
            this.getCompanyForMap();
            this.getDeviceStatistic();
        });
    },
    mounted() {
        this.changeNum();
    },
    // beforeRouteLeave(to, from, next) {
    //     next((vm) => {
    //         clearInterval(vm.timer);
    //         vm.timer = null;
    //     });
    // },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        changeNum() {
            // 定时器
            let _this = this;
            this.timer = setInterval(() => {
                setTimeout(function () {
                    console.log("设备状态");
                    _this.getCompanyForMap();
                    _this.getDeviceStatistic();
                }, 0);
            }, 20000);
        },

        clickEvent() {
            this.totalDevice = 99;
        },

        // 获取地图显示所需企业信息
        getCompanyForMap() {
            let _this = this;

            this.axios({
                method: "get",
                url:
                    "http://test.soot.xhs-sz.com:9065/api/v1/screenDisplay/companyForMap",
                headers: {
                    Authorization: `Bearer ${_this.token}`,
                },
            })
                .then((res) => {
                    if (
                        res &&
                        res.status == 200 &&
                        res.data &&
                        res.data.length
                    ) {
                        let statusImg = [
                            "http://test.soot.xhs-sz.com/img/point1.png", //异常
                            "http://test.soot.xhs-sz.com/img/point2.png", //超标
                            "http://test.soot.xhs-sz.com/img/point3.png", //离线
                            "http://test.soot.xhs-sz.com/img/point4.png", //正常
                            // "../src/assets/img/point1.png",
                            // "../src/assets/img/point2.png",
                            // "../src/assets/img/point3.png",
                            // "../src/assets/img/point4.png",
                        ];

                        res.data.forEach((item, index) => {
                            let a = item.latitudeLongitude.split(",");

                            item.status = index % 4; //状态
                            item.statusImg = statusImg[index % 4];
                            item.lng = a[0];
                            item.lat = a[1];
                        });

                        _this.mapdata = res.data;
                    }
                })
                .catch((err) => {
                    console.log("请求失败");
                });
        },

        getDeviceStatistic() {
            let _this = this;

            // _this.totalDevice = Math.random() * 100;
            // _this.totalNormalDevice = Math.random() * 100;
            // _this.totalOfflineDevice = Math.random() * 100;
            // _this.totalExcessiveDevice = Math.random() * 100;
            // _this.totalAbnormalLinkageDevice = Math.random() * 100;
            // _this.totalOverdueDevice = Math.random() * 100;

            this.axios({
                method: "get",
                url:
                    "http://test.soot.xhs-sz.com:9065/api/v1/screenDisplay/deviceStatistic",
                headers: {
                    Authorization: `Bearer ${_this.token}`,
                },
            })
                .then((res) => {
                    if (res && res.status == 200 && res.data) {
                        res = res.data;
                        _this.totalDevice =
                            res.totalDevice + Math.random() * 100;
                        _this.totalNormalDevice =
                            res.totalNormalDevice + Math.random() * 100;
                        _this.totalOfflineDevice =
                            res.totalOfflineDevice + Math.random() * 100;
                        _this.totalExcessiveDevice =
                            res.totalExcessiveDevice + Math.random() * 100;
                        _this.totalAbnormalLinkageDevice =
                            res.totalAbnormalLinkageDevice +
                            Math.random() * 100;
                        _this.totalOverdueDevice =
                            res.totalOverdueDevice + Math.random() * 100;
                    }
                })
                .catch((err) => {
                    console.log("请求失败");
                });
        },

        full() {
            // 关闭时，弹框打开
            if (this.fullMap) {
                // this.showRight = true;
                this.changeNum();
            } else {
                clearInterval(this.timer);
                this.timer = null;
            }

            this.$emit("fullScreen");
        },
        openRight() {
            this.showRight = true;
        },
        closeRight() {
            this.showRight = false;
        },
        clickMapPoint(e) {
            this.mapIndex = e.mapIndex;
            this.showRight = true;
        },
    },
};
</script>

<style lang="less" scoped>
.middleCenterBox {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.fullscreen {
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    position: absolute;
    left: 22px;
    top: 19px;
    z-index: 10;
    background: rgba(0, 111, 183, 0.7);
    border: 1px solid #0596d5;
    color: #b7efff;
    border-radius: 2px;
    font-size: 13px;
    overflow: hidden;
    cursor: pointer;
}
.close {
    position: absolute;
    right: 0;
    top: 10%;
    z-index: 10;
    width: 66px;
    height: 60px;
    color: #fff;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    background: #ffa800;
    border: 1px solid #ffa800;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
    cursor: pointer;
}
.con {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 20px;
    z-index: 10;
    box-sizing: border-box;
    background: rgba(0, 15, 45, 0.6);
    .btopleft,
    .btopright,
    .bbottomleft,
    .bbottomright {
        width: 11px;
        height: 11px;
        border-radius: 2px;
        overflow: hidden;
        position: absolute;
    }
    .btopleft {
        border-top: 3px solid #fff;
        border-left: 3px solid #fff;
    }
    .btopright {
        right: 20px;
        border-top: 3px solid #fff;
        border-right: 3px solid #fff;
    }
    .bbottomleft {
        bottom: 20px;
        border-bottom: 3px solid #fff;
        border-left: 3px solid #fff;
    }
    .bbottomright {
        right: 20px;
        bottom: 20px;
        border-bottom: 3px solid #fff;
        border-right: 3px solid #fff;
    }

    .status {
        padding: 0 30px 20px;
        box-sizing: border-box;
        color: #fff;
        ul {
            display: flex;
            justify-content: space-between;
            width: 100%;
            li {
                width: 13%;
                text-align: center;
                font-family: "DigifaceWide Regular";
                .circle {
                    display: block;
                    width: 100%;
                    padding-bottom: 100%;
                    border-radius: 50%;
                    position: relative;
                    b {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                        font-size: 28px;
                    }
                }
                .btn {
                    margin-top: 20px;
                    width: 100%;
                    height: 36px;
                    line-height: 36px;
                    font-size: 13px;
                    &.status1 {
                        box-shadow: 0px 0px 6px 4px #17619f inset;
                    }
                    &.status2 {
                        box-shadow: 0px 0px 6px 4px #027e55 inset;
                    }
                    &.status3 {
                        box-shadow: 0px 0px 6px 4px #5a6374 inset;
                    }
                    &.status4 {
                        box-shadow: 0px 0px 6px 4px #a78d34 inset;
                    }
                    &.status5 {
                        box-shadow: 0px 0px 6px 4px #a7341c inset;
                    }
                    &.status6 {
                        box-shadow: 0px 0px 6px 4px #a75e1c inset;
                    }
                }
            }
        }
    }
    .iconfont {
        margin-top: auto !important;
    }
}
</style>
