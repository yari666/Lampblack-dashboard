<template>
    <div id="allmap"></div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            mapPoint: [],
            mapZoom: 13,
        };
    },
    props: ["mapdata", "fullMap"],
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.mapInit();
        });
    },
    watch: {
        fullMap(to) {
            setTimeout(() => {
                // this.map.centerAndZoom(new BMapGL.Point(120.595, 31.2919), 13);

                // 自动设置地图中心点和视野级别
                var v = this.map.getViewport(this.mapPoint);
                this.mapZoom = v.zoom;
                this.map.centerAndZoom(v.center, v.zoom);
            }, 200);
        },
        mapdata(to) {
            this.add();
        },
    },
    methods: {
        mapInit() {
            let _this = this;

            //百度地图API功能
            this.map = new BMapGL.Map("allmap");
            let map = this.map;
            // var point = new BMapGL.Point(120.595, 31.2919);
            // map.centerAndZoom(point);

            // // 地图皮肤
            map.setMapStyleV2({
                styleId: "3f4be6653de2b8b2ff3f78003cdc3f8d",
            });

            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

            this.add();
        },
        // 向地图添加标注
        add() {
            let map = this.map;

            this.mapdata.forEach((item) => {
                var point = new BMapGL.Point(item.lng, item.lat);
                this.mapPoint.push(point);

                // 创建图标
                var myIcon = new BMapGL.Icon(
                    item.statusImg,
                    new BMapGL.Size(35, 45)
                );

                // 创建标注
                var marker = new BMapGL.Marker(point, {
                    icon: myIcon,
                    title: item.companyName,
                });

                // 将标注添加到地图中
                map.addOverlay(marker);
                marker.addEventListener("click", this.clickEvent);
            });

            // 自动设置地图中心点和视野级别
            var v = map.getViewport(this.mapPoint);
            this.mapZoom = v.zoom;
            map.centerAndZoom(v.center, v.zoom);
        },
        clickEvent(e) {
            var index = 0;
            var title = e.srcElement._config.title;

            this.mapdata.forEach((item, i) => {
                if (item.companyName == title) {
                    index = i;
                }
            });

            this.map.centerAndZoom(
                new BMapGL.Point(e.latLng.lng, e.latLng.lat),
                this.mapZoom
            );
            console.log(index);

            this.$emit("clickMapPoint", {
                mapIndex: index,
                showRight: true,
            });
        },
    },
};
</script>

<style lang="less" scoped>
#allmap {
    height: 100%;
}
.maptip {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin: 100px;
    background-color: red;
    border-radius: 100px 100px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>