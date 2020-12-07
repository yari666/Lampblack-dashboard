<template>
    <div class="middleLeftBox">
        <title-box :title="title" :showLine="true" :showMore="false"></title-box>
        <ul class="menu">
            <li v-for="(item,index) in totalData" :key="index">
                <icon-button
                    class="iconButton"
                    :btnName="item.btnName"
                    :btnBackgroundColor="item.btnBackgroundColor"
                ></icon-button>
                <p>
                    <span>{{item.name}}</span>
                    <b>{{item.num}}家</b>
                </p>
            </li>
        </ul>

        <div class="areaChart">
            <title-box :title="'辖区划分统计 [34]'" :showLine="true" :showMore="false"></title-box>
            <div id="areaEchart"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.middleLeftBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 35px 7%;
    box-sizing: border-box;
    .menu {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-center;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;
        li {
            width: 30%;
            padding: 0 15px 20px;
            box-sizing: border-box;
            .iconButton {
                margin-right: 10px;
            }
            p {
                font-size: 1rem;
                white-space: nowrap;
                span {
                    display: block;
                    color: #999;
                }
                b {
                    color: #3ed9ff;
                    position: relative;
                    top: 5px;
                }
            }
        }
    }

    .areaChart {
        width: 100%;
        overflow: hidden;
        #areaEchart {
            width: 100%;
            height: calc(~"33vh - 50px");
        }
    }
}
</style>

<script>
import titleBox from "../../components/title";
import iconButton from "../../components/iconButton";

var echarts = require("echarts");

export default {
    data() {
        return {
            title: "餐饮企业统计",
            mlchart: {},
            chartData: {
                yAxis: [],
                series: [],
            },
            totalData: [
                {
                    name: "餐饮企业",
                    num: "0",
                    btnBackgroundColor: "#41abfd",
                    btnName: "http://test.soot.xhs-sz.com/img/icon_company.png",
                },
                {
                    name: "已安装",
                    num: "0",
                    btnBackgroundColor: "#5cf089",
                    btnName: "http://test.soot.xhs-sz.com/img/icon_yes.png",
                },
                {
                    name: "未安装",
                    num: "0",
                    btnBackgroundColor: "#edd92c",
                    btnName: "http://test.soot.xhs-sz.com/img/icon_no.png",
                },
                {
                    name: "大型",
                    num: "0",
                    btnBackgroundColor: "#f45a1f",
                    btnName: "http://test.soot.xhs-sz.com/img/icon_big.png",
                },
                {
                    name: "中型",
                    num: "0",
                    btnBackgroundColor: "#c835df",
                    btnName: "http://test.soot.xhs-sz.com/img/icon_zhong.png",
                },
                {
                    name: "小型",
                    num: "0",
                    btnBackgroundColor: "#a3cc59",
                    btnName: "http://test.soot.xhs-sz.com/img/icon_small.png",
                },
            ],
        };
    },
    components: { titleBox, iconButton },
    created() {
        let _this = this;

        _this.getCompanyStatisticData();

        this.$nextTick(() => {
            setTimeout(() => {
                _this.areaEchart();
            }, 1300);
        });
    },
    mounted() {
        let _this = this;
        window.addEventListener("resize", function () {
            _this.mlchart.resize();
        });
    },
    methods: {
        // 获取企业相关统计信息
        getCompanyStatisticData() {
            var token = window.localStorage.getItem("token");

            this.axios({
                method: "get",
                url:
                    "http://test.soot.xhs-sz.com:9065/api/v1/screenDisplay/companyStatisticData",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res && res.data) {
                        res = res.data;

                        // 餐饮统计
                        if (res.totalAll) this.totalData[0].num = res.totalAll;
                        if (res.totalInstalled)
                            this.totalData[1].num = res.totalInstalled;
                        if (res.totalAll)
                            this.totalData[2].num = res.totalUnInstalled;
                        if (res.totalAll)
                            this.totalData[3].num = res.totalLarge;
                        if (res.totalAll)
                            this.totalData[4].num = res.totalMedium;
                        if (res.totalAll)
                            this.totalData[5].num = res.totalSmaller;

                        // 辖区划分统计
                        if (res.companyForStreetModels) {
                            res.companyForStreetModels.forEach((i) => {
                                this.chartData.yAxis.push({
                                    value: i.subordinateToStreet,
                                    textStyle: {
                                        color: "#fff",
                                    },
                                });

                                this.chartData.series.push({
                                    value: i.count,
                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            1,
                                            1,
                                            [
                                                { offset: 0, color: "#16aee8" },
                                                { offset: 1, color: "#046fe8" },
                                            ]
                                        ),
                                    },
                                });
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log("请求失败");
                });
        },

        areaEchart() {
            this.mlchart = echarts.init(document.getElementById("areaEchart"));

            var option = {
                grid: {
                    left: 60,
                    top: 0,
                    right: 60,
                    bottom: 0,
                },
                toolbox: {
                    show: true,
                },
                calculable: true,
                xAxis: [
                    {
                        type: "value",
                        show: false,
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "category",
                        offset: 0,
                        data: this.chartData.yAxis,
                        splitLine: {
                            show: false,
                        },
                        //设置轴线的属性
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        barWidth: "30%",
                        data: this.chartData.series,
                        /* 显示柱子数据 */
                        label: {
                            normal: {
                                show: true,
                                // 数据在柱子头部显示
                                position: "right",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 13,
                                },
                            },
                        },
                    },
                ],
                // 滚动条
                dataZoom: [
                    {
                        type: "slider",
                        show: this.chartData.yAxis.length > 8,
                        filterMode: "empty",
                        disabled: false,
                        yAxisIndex: 0,
                        // top: '25%',
                        right: 0,
                        // bottom: '15%',
                        width: 6,
                        start: 0,
                        end: this.chartData.yAxis.length > 8 ? 80 : 100,
                        handleSize: "0", // 滑动条的 左右2个滑动小块的大小
                        handleIcon:
                            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                        textStyle: {
                            color: "#fff",
                        },
                        fillerColor: "#3C62C0", // 拖动条的颜色
                        borderColor: "none",
                        backgroundColor: "#134095",
                        showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
                    },
                ],
            };

            this.mlchart.setOption(option);
        },
    },
};
</script>