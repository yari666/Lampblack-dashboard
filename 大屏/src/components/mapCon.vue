<template>
    <div
        class="mapCon animate__animated"
        :class="showRight ? 'animate__fadeInRightBig':'animate__fadeOutRightBig'"
    >
        <!-- 全屏弹框关闭按钮 -->
        <div class="close" @click="rightEvent">
            <i class="el-icon-arrow-right"></i>
        </div>

        <h1 v-if="companyName">{{companyName}}</h1>

        <div class="company">
            <ul>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_epu.png" />
                    <span>设&nbsp;备&nbsp;状&nbsp;态：</span>
                    <b class="normal">正常</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_lampblack.png" />
                    <span>油&nbsp;烟&nbsp;浓&nbsp;度：</span>
                    <b class="normal">0.04</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_state fj.png" />
                    <span>风&nbsp;机&nbsp;状&nbsp;态：</span>
                    <b class="error">关闭</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_a.png" />
                    <span>风&nbsp;机&nbsp;电&nbsp;流：</span>
                    <b class="normal">0.03mg/m³</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_state_jhq.png" />
                    <span>净化器状态：</span>
                    <b class="normal">正常</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_ajhq.png" />
                    <span>净化器电流：</span>
                    <b class="normal">0.01mg/m³</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_methane.png" />
                    <span>非甲烷总烃：</span>
                    <b class="normal">0.04</b>
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/map_icon_granule.png" />
                    <span>颗粒物浓度：</span>
                    <b class="normal">0.06mg/m³</b>
                </li>
            </ul>
        </div>

        <div class="dec">
            <div class="star">
                <span>安全星级</span>
                <i class="el-icon-star-on"></i>
                <i class="el-icon-star-on"></i>
                <i class="el-icon-star-on"></i>
                <i class="el-icon-star-on"></i>
                <i class="el-icon-star-off"></i>
            </div>

            <div class="more">
                实时数据
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="more">
                历史数据
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="more">
                报警信息
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="more">
                设备台账
                <i class="el-icon-d-arrow-right"></i>
            </div>
        </div>

        <div class="status">
            <ul>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_ad.png" />
                    {{companyAddress}}
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_str.png" />
                    {{subordinateToStreet}}
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_mant.png" />
                    {{contact}}
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_ph.png" />
                    {{contactPhone}}
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_fax.png" />
                    {{companyCode}}
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_range.png" />
                    {{businessScope}}
                </li>
                <li>
                    <img src="http://test.soot.xhs-sz.com/img/icon_size.png" />
                    {{['','大型企业','中型企业','小型企业'][companyScale]}}
                </li>
            </ul>

            <div class="imgbox">
                <img
                    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3925340550,503299386&fm=26&gp=0.jpg"
                />
                <img
                    src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=267817157,3993463591&fm=26&gp=0.jpg"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            companyName: "",
            companyAddress: "",
            subordinateToStreet: "",
            contact: "",
            contactPhone: "",
            companyCode: "",
            businessScope: "",
            companyScale: 0,
        };
    },
    props: ["showRight", "mapdata", "mapIndex"],
    watch: {
        mapIndex() {
            this.companyName = this.mapdata[this.mapIndex].companyName;
            this.companyAddress = this.mapdata[this.mapIndex].companyAddress;
            this.subordinateToStreet = this.mapdata[
                this.mapIndex
            ].subordinateToStreet;
            this.contact = this.mapdata[this.mapIndex].contact;
            this.contactPhone = this.mapdata[this.mapIndex].contactPhone;
            this.companyCode = this.mapdata[this.mapIndex].companyCode;
            this.businessScope = this.mapdata[this.mapIndex].businessScope;
            this.companyScale = this.mapdata[this.mapIndex].companyScale;
        },
    },
    methods: {
        rightEvent() {
            this.$emit("closeRight");
        },
    },
};
</script>

<style lang="less" scoped>
.normal {
    color: #92ff67;
}
.error {
    color: #e9681c;
}

.mapCon {
    width: 20%;
    height: 100%;
    background: rgba(0, 79, 130, 0.94);
    border: 1px solid rgba(14, 132, 208, 1);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    color: #bceeff;
    font-size: 14px;
    font-weight: 300;
    .close {
        position: absolute;
        left: -42px;
        top: 10%;
        z-index: 10;
        width: 40px;
        height: 60px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        background: rgba(0, 79, 130, 0.94);
        border: 1px solid rgba(14, 132, 208, 1);
        text-align: center;
        line-height: 60px;
        font-size: 26px;
        cursor: pointer;
    }
    h1 {
        font-size: 20px;
        font-weight: 400;
        border-bottom: 1px solid #99d3e8;
        padding: 15px 20px;
        margin: 0 6px;
    }

    .company {
        padding: 10px 22px;
        margin: 0 6px;
        border-bottom: 1px solid #528a9e;
        li {
            width: 100%;
            line-height: 20px;
            margin-bottom: 10px;
            img {
                width: 14px;
                height: 14px;
                float: left;
                margin: 3px 10px 0 0;
            }
            b {
                font-weight: 300;
            }
        }
    }
    .dec {
        padding: 15px 20px 20px;
        margin: 0 6px;
        .star {
            margin-bottom: 20px;
            span {
                margin-right: 10px;
            }
            i {
                color: #ffa800;
                font-size: 28px;
                vertical-align: -4px;
                &.el-icon-star-off {
                    font-size: 24px;
                }
            }
        }
        .more {
            padding: 5px 10px;
            border: 1px solid #117cad;
            border-radius: 3px;
            background: rgba(71, 166, 239, 0.41);
            margin-bottom: 16px;
            color: #a6e7ff;
            i {
                float: right;
            }
            &:last-child {
                margin-bottom: 5px;
            }
        }
    }
    .status {
        padding: 10px 22px;
        margin: 0 6px;
        border-top: 1px solid #528a9e;
        li {
            width: 100%;
            line-height: 20px;
            margin-bottom: 10px;
            img {
                width: 14px;
                height: 14px;
                float: left;
                margin: 3px 10px 0 0;
            }
        }
        .imgbox {
            margin-top: 15px;
            overflow: hidden;
            img {
                width: 140px;
                height: 100px;
                margin: 0 20px 10px 0;
            }
        }
    }
}
</style>

