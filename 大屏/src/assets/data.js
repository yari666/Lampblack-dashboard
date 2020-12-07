module.exports = {

    // 设备统计

    // 巡检统计


    // 餐饮企业接口
    companyData: [
        {
            name: "餐饮企业",
            value: "149家",
            btnBackgroundColor: "#41abfd",
            btnName: "http://test.soot.xhs-sz.com/img/icon_company.png",
        },
        {
            name: "已安装",
            value: "149家",
            btnBackgroundColor: "#5cf089",
            btnName: "http://test.soot.xhs-sz.com/img/icon_yes.png",
        },
        {
            name: "未安装",
            value: "0家",
            btnBackgroundColor: "#edd92c",
            btnName: "http://test.soot.xhs-sz.com/img/icon_no.png",
        },
        {
            name: "大型",
            value: "76家",
            btnBackgroundColor: "#f45a1f",
            btnName: "http://test.soot.xhs-sz.com/img/icon_big.png",
        },
        {
            name: "中型",
            value: "61家",
            btnBackgroundColor: "#c835df",
            btnName: "http://test.soot.xhs-sz.com/img/icon_zhong.png",
        },
        {
            name: "小型",
            value: "12家",
            btnBackgroundColor: "#a3cc59",
            btnName: "http://test.soot.xhs-sz.com/img/icon_small.png",
        },
    ],

    // 辖区划分统计
    areaData: [
        {
            name: '大学路',
            value: 50
        },
        {
            name: '人民路',
            value: 60
        },
    ],

    // 地图弹框数据
    HotelData: [
        {
            name: "设备名称",
            id: 1024,
            lng: 120.60255906359723,
            lat: 31.29875476910893,
            status: 1,  //设备状态
            imgUrl: "http://test.soot.xhs-sz.com/img/point3.png",  //可不要
            belongCompany: "新合盛资产管理公司",

            //酒店信息
            hotelName: '满意大酒店',
            hotelAddress: '江苏省苏州市吴中区',
            hotelAddressStreet: '金鸡湖大道',
            hotelManager: '王总',
            phone: '15190908888',
            hotelTel: '021-88888888',
            hotelIntro: '餐饮、住宿、娱乐、外卖、婚庆……',
            hotelType: '中型企业'
        }
    ],

    // 设备实时状态统计
    machineData: [
        {
            type: '1', //设备状态
            value: '151'  //此状态设备数量
        },
        {
            type: '2', //设备状态
            value: '80'  //此状态设备数量
        }
    ],

    // 设备报警统计
    warnMachineData: [
        {
            name: '报警状态',
            data: [
                {
                    type: '待处理',
                    value: 80
                },
                {
                    type: '处理中',
                    value: 90
                },
                {
                    type: '已归档',
                    value: 100
                },
            ]
        },
        {
            name: '报警类型',
            data: [
                {
                    type: '异常',
                    value: 80
                },
                {
                    type: '离线',
                    value: 90
                },
                {
                    type: '超标',
                    value: 100
                },
            ]
        }
    ],
    // 全区油烟排放环比  月
    lampblackData: [23, 11, 22, 42, 11, 23, 23, 11, 22, 42, 11, 23],

    // 执法巡检统计 周  ？
    inspectionData: [11, 23, 23, 11, 22, 42, 11, 23],

    // 清洗台账  季度  ？
    clearData: [11, 23, 23, 11, 22, 42, 11, 23],
};