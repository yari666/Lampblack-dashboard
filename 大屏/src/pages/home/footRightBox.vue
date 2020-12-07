<template>
    <div class="footRightBox">
        <title-box :title="title" :showLine="true" :showMore="true"></title-box>
        <div id="echart6"></div>
    </div>
</template>


<script>
var echarts = require("echarts");
import titleBox from "../../components/title";

export default {
    data() {
        return {
            title: "清洗台账",
            frchart: {},
            xAxis: [],
            series: [],
            isFirst: true,
        };
    },
    components: { titleBox },
    props: ["qxtz"],
    created() {
        let _this = this;

        this.$nextTick(() => {
            setTimeout(() => {
                _this.echart6();
            }, 1300);
        });
    },
    mounted() {
        let _this = this;
        this.echartData();
        window.addEventListener("resize", function () {
            _this.frchart.resize();
        });
    },
    watch: {
        qxtz() {
            this.echartData();
        },
    },
    methods: {
        echartData() {
            this.xAxis = [];
            this.series = [];
            this.qxtz.forEach((item) => {
                this.xAxis.push(item.inspectionDate.substring(5, 10));
                this.series.push(item.count);
            });
            if (!this.isFirst) {
                this.echart6();
            }
        },
        echart6() {
            this.isFirst = false;
            this.frchart = echarts.init(document.getElementById("echart6"));

            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
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
                        boundaryGap: false,
                        data: this.xAxis.slice(-6),
                        splitLine: {
                            show: true,
                            color: "#ccc",
                        },
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: "#ccc",
                            },
                        },
                        axisLabel: {
                            color: "#81fffe",
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        show: true,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#ccc",
                            },
                        },
                        axisLabel: {
                            color: "#81fffe",
                        },
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            color: "#ccc",
                        },
                    },
                ],
                series: [
                    {
                        name: "清洗台账",
                        type: "line",
                        symbol: "circle",
                        symbolSize: 3,
                        smooth: true,
                        areaStyle: {
                            color: "#16b5b8",
                        },
                        lineStyle: {
                            color: "#42dfd5",
                        },
                        itemStyle: {
                            color: "#35e1d5",
                        },
                        data: this.series.slice(-6),
                    },
                ],
            };

            this.frchart.setOption(option);
        },
    },
};
</script>

<style lang="less" scoped>
.footRightBox {
    width: 100%;
    height: 100%;
    color: #fff;
    padding: 20px 4.6%;
    box-sizing: border-box;
    #echart6 {
        width: 100%;
        height: calc(~"40vh - 180px");
    }
}
</style>