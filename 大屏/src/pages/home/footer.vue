<template>
    <div
        class="footer animate__animated"
        :class="fullMap?'animate__fadeOutDownBig':'animate__fadeInUpBig'"
    >
        <div class="left">
            <dv-border-box-8 backgroundColor="rgba(0,38,101,0.64)">
                <foot-left-box></foot-left-box>
            </dv-border-box-8>
        </div>
        <div class="center">
            <dv-border-box-8 backgroundColor="rgba(0,38,101,0.64)">
                <foot-center-box :zfxj="zfxj"></foot-center-box>
            </dv-border-box-8>
        </div>
        <div class="right">
            <dv-border-box-8 backgroundColor="rgba(0,38,101,0.64)">
                <foot-right-box :qxtz="qxtz"></foot-right-box>
            </dv-border-box-8>
        </div>
    </div>
</template>

<script>
import footLeftBox from "./footLeftBox";
import footCenterBox from "./footCenterBox";
import footRightBox from "./footRightBox";

export default {
    data() {
        return {
            qxtz: [], //清洗台帐
            zfxj: [], //执法巡检

            timer: null, //定时器
        };
    },
    components: { footLeftBox, footCenterBox, footRightBox },
    props: ["fullMap"],
    mounted() {
        this.getInspectionTypeStatistic(0); //清洗台帐
        this.getInspectionTypeStatistic(1); //执法巡检

        this.changeNum();
    },
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
                    console.log("执法巡检清洗台账");
                    _this.getInspectionTypeStatistic(0); //清洗台帐
                    _this.getInspectionTypeStatistic(1); //执法巡检
                }, 0);
            }, 20000);
        },

        // 获取巡检的相关统计查询信息
        getInspectionTypeStatistic(typeid) {
            let _this = this;
            var token = window.localStorage.getItem("token");

            this.axios({
                url: `http://test.soot.xhs-sz.com:9065/api/v1/screenDisplay/inspectionTypeStatistic?inspectionType=${typeid}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (
                        res &&
                        res.status == 200 &&
                        res.data &&
                        res.data.length
                    ) {
                        if (typeid == 0) {
                            // 清洗台帐
                            _this.qxtz = res.data;

                            _this.qxtz.push({
                                inspectionDate: `2020-08-0${parseInt(
                                    Math.random() * 10
                                )}`,
                                count: parseInt(Math.random() * 10),
                            });
                        } else if (typeid == 1) {
                            // 执法巡检
                            _this.zfxj = res.data;

                            _this.zfxj.push({
                                inspectionDate: `2020-08-0${parseInt(
                                    Math.random() * 10
                                )}`,
                                count: parseInt(Math.random() * 10),
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log("请求失败");
                });
        },
    },
};
</script>

<style lang="less" scoped>
.footer {
    width: 100%;
    height: calc(~"40vh - 105px");
    margin-top: 20px;
}
.left {
    float: left;
    width: 31.333333%;
    height: 100%;
    margin-left: 1.5%;
    box-sizing: border-box;
}
.center {
    width: 31.333333%;
    height: 100%;
    float: left;
    margin: 0 1.5%;
    box-sizing: border-box;
}
.right {
    width: 31.33333%;
    height: 100%;
    float: right;
    margin-right: 1.5%;
    box-sizing: border-box;
}
</style>