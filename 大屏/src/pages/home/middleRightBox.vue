<template>
    <div class="middleRightBox">
        <title-box :title="title" :showLine="true"></title-box>
        <div id="echart2"></div>
        <div id="echart3"></div>
    </div>
</template>

<style lang="less" scoped>
.middleRightBox {
    width: 100%;
    height: 100%;
    color: #fff;
    padding: 35px 7%;
    box-sizing: border-box;
    #echart2,
    #echart3 {
        width: 100%;
        height: calc(~"26vh");
    }
}
</style>


<script>
var echarts = require("echarts");
import titleBox from "../../components/title";

export default {
    data() {
        return {
            title: "设备报警统计",
            mychart1: {},
            mychart2: {},
        };
    },
    components: { titleBox },
    created() {
        let _this = this;
        this.$nextTick(() => {
            setTimeout(() => {
                _this.echart2();
                _this.echart3();
            }, 1300);
        });
    },
    mounted() {
        let _this = this;
        window.addEventListener("resize", function () {
            _this.mychart1.resize();
            _this.mychart2.resize();
        });
    },
    methods: {
        echart2() {
            this.mychart1 = echarts.init(document.getElementById("echart2"));

            let option = {
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                label: {
                    color: "#208de7",
                },
                calculable: true,

                legend: {
                    right: 20,
                    top: 10,
                    orient: "vertical",
                    textStyle: {
                        color: "#fff",
                    },
                    data: ["已完成", "待处理", "已归档", "处理中", "未归档"],
                },
                series: [
                    {
                        name: "报警状态",
                        type: "pie",
                        radius: [0, "70%"],
                        center: ["40%", "40%"],
                        // roseType: "radius",
                        labelLine: {
                            show: true,
                            length: 10,
                            lineStyle: {
                                color: "#208de7",
                            },
                        },
                        data: [
                            { value: 30, name: "已完成" },
                            { value: 10, name: "待处理" },
                            { value: 20, name: "已归档" },
                            { value: 15, name: "处理中" },
                            { value: 25, name: "未归档" },
                        ],
                    },
                ],
            };

            this.mychart1.setOption(option);
        },
        echart3() {
            this.mychart2 = echarts.init(document.getElementById("echart3"));

            let option = {
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                },
                label: {
                    color: "#208de7",
                },
                legend: {
                    right: 20,
                    top: 30,
                    textStyle: {
                        color: "#fff",
                    },
                    orient: "vertical",
                    data: ["异常", "关机", "超标", "在线", "正常"],
                },
                series: [
                    {
                        name: "报警类型",
                        type: "pie",
                        radius: [0, "70%"],
                        center: ["40%", "40%"],
                        // roseType: "radius",
                        labelLine: {
                            show: true,
                            length: 10,
                            lineStyle: {
                                color: "#208de7",
                            },
                        },
                        data: [
                            { value: 20, name: "异常" },
                            { value: 10, name: "关机" },
                            { value: 15, name: "超标" },
                            { value: 20, name: "在线" },
                            { value: 25, name: "正常" },
                        ],
                    },
                ],
            };

            this.mychart2.setOption(option);
        },
    },
};
</script>