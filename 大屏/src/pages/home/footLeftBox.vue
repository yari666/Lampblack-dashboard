<template>
    <div class="footLeftBox">
        <title-box :title="title" :showLine="true" :showMore="true"></title-box>
        <div id="echart4"></div>
    </div>
</template>

<script>
var echarts = require("echarts");
import titleBox from "../../components/title";

export default {
    data() {
        return {
            title: "全区油烟排放量环比趋势",
            flchart: {},
        };
    },
    components: { titleBox },
    created() {
        let _this = this;
        this.$nextTick(() => {
            setTimeout(() => {
                _this.echart4();
            }, 1300);
        });
    },
    mounted() {
        let _this = this;
        window.addEventListener("resize", function () {
            _this.flchart.resize();
        });
    },
    methods: {
        echart4() {
            this.flchart = echarts.init(document.getElementById("echart4"));

            let option = {
                tooltip: {
                    trigger: "axis",
                    formatter: function (params) {
                        var relVal = params[0].name + "月";
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal +=
                                "<br/>" +
                                params[i].marker +
                                params[i].seriesName +
                                " : " +
                                params[i].value +
                                "mg/m³";
                        }
                        return relVal;
                    },
                },
                grid: {
                    top: 10,
                    left: 0,
                    right: 10,
                    bottom: 5,
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    nameTextStyle: {
                        color: "#fff",
                    },
                    splitLine: {
                        show: true,
                        interval: 1,
                        lineStyle: {
                            color: "#343e5d",
                            type: "dashed",
                        },
                    },
                    //设置轴线的属性
                    axisLine: {
                        lineStyle: {
                            color: "#07a9e0",
                        },
                    },
                    // axisPointer: {
                    //     label: {
                    //         formatter: function (params) {
                    //             return params.value + "月";
                    //         },
                    //     },
                    // },
                },
                yAxis: {
                    type: "value",
                    show: true,
                    axisLine: {
                        lineStyle: {
                            color: "#07a9e0",
                        },
                    },
                    // 控制网格线是否显示
                    splitLine: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: "油烟浓度",
                        data: [33, 32, 26, 29, 27, 36, 31, 30, 26, 29, 25, 28],
                        type: "line",
                        smooth: true,
                        symbol: "circle",
                        color: "#10f7cb",
                        symbolSize: 6,
                        lineStyle: {
                            shadowColor: "#10f7cb",
                            shadowBlur: 8,
                            shadowOffsetY: 3.5,
                        },
                    },
                    {
                        name: "非甲烷总烃",
                        data: [
                            19,
                            22,
                            {
                                value: 29,
                                label: {
                                    show: true,
                                    color: "#333",
                                    backgroundColor: "#fff",
                                    padding: [3, 6, 3, 6],
                                    borderRadius: [2, 2, 2, 2],
                                    shadowColor: "#fff",
                                    shadowBlur: 3,
                                    shadowOffsetY: 1,
                                    distance: 8,
                                },
                            },
                            18,
                            24,
                            25,
                            19,
                            20,
                            {
                                value: 15,
                                label: {
                                    show: true,
                                    color: "#333",
                                    backgroundColor: "#fff",
                                    padding: [3, 6, 3, 6],
                                    borderRadius: [2, 2, 2, 2],
                                    shadowColor: "#fff",
                                    shadowBlur: 3,
                                    shadowOffsetY: 1,
                                    distance: 8,
                                },
                            },
                            19,
                            21,
                            22,
                        ],
                        type: "line",
                        smooth: true,
                        symbol: "circle",
                        symbolSize: 6,
                        color: "#f76760",
                        lineStyle: {
                            shadowColor: "#f76760",
                            shadowBlur: 8,
                            shadowOffsetY: 3.5,
                        },
                    },
                    {
                        name: "颗粒物浓度",
                        data: [9, 12, 11, 14, 15, 12, 8, 13, 10, 12, 8, 10],
                        type: "line",
                        smooth: true,
                        symbol: "circle",
                        symbolSize: 6,
                        color: "#2decfe",
                        lineStyle: {
                            shadowColor: "#2decfe",
                            shadowBlur: 8,
                            shadowOffsetY: 3.5,
                        },
                    },
                ],
            };

            this.flchart.setOption(option);
        },
    },
};
</script>

<style lang="less" scoped>
.footLeftBox {
    width: 100%;
    height: 100%;
    color: #fff;
    padding: 20px 4.6%;
    box-sizing: border-box;
    #echart4 {
        width: 100%;
        height: calc(~"40vh - 180px");
    }
}
</style>