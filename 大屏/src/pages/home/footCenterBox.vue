<template>
    <div class="footCenterBox">
        <title-box :title="title" :showLine="true" :showMore="true"></title-box>
        <div id="echart5"></div>
    </div>
</template>


<script>
const timestamp = require("time-stamp");

var echarts = require("echarts");
import titleBox from "../../components/title";

export default {
    data() {
        return {
            title: "执法巡检统计",
            fcchart: {},
            xAxis: [],
            series: [],
            isFirst: true,
        };
    },
    components: { titleBox },
    props: ["zfxj"],
    created() {
        let _this = this;
        this.$nextTick(() => {
            setTimeout(() => {
                _this.echart5();
            }, 1300);
        });
    },
    mounted() {
        let _this = this;
        _this.echartData();
        window.addEventListener("resize", function () {
            _this.fcchart.resize();
        });
    },
    watch: {
        zfxj() {
            this.echartData();
        },
    },
    methods: {
        echartData() {
            this.xAxis = [];
            this.series = [];

            this.zfxj.forEach((item) => {
                this.xAxis.push(item.inspectionDate.substring(5, 10));
                this.series.push(item.count);
            });
            if (!this.isFirst) {
                this.echart5();
            }
        },
        echart5() {
            this.isFirst = false;
            this.fcchart = echarts.init(document.getElementById("echart5"));

            let option = {
                color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    top: 10,
                    left: 0,
                    right: 10,
                    bottom: 5,
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.xAxis.slice(-8),
                        axisTick: {
                            alignWithLabel: true,
                        },

                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: "#07a9e0",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: "#07a9e0",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "巡检次数",
                        type: "bar",
                        barWidth: "60%",
                        data: this.series.slice(-8),
                        animationDelay: function (idx) {
                            return idx * 10;
                        },
                    },
                ],
            };

            this.fcchart.setOption(option);
        },
    },
};
</script>

<style lang="less" scoped>
.footCenterBox {
    width: 100%;
    height: 100%;
    color: #fff;
    padding: 20px 4.6%;
    box-sizing: border-box;
    #echart5 {
        width: 100%;
        height: calc(~"40vh - 180px");
    }
}
</style>