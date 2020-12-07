<template>
    <div class="login">
        <div class="overbg">
            <div class="main">
                <h1>餐饮业油烟管理平台</h1>
                <p>PLATFORM</p>

                <div class="box">
                    <dv-border-box-13 :color="['#216fa5']" backgroundColor="rgba(14,132,208,0.08)">
                        <div class="formbox">
                            <span>Userlogin</span>
                            <div class="label">
                                <i class="icon_man"></i>
                                <input
                                    type="text"
                                    placeholder="输入登录名称"
                                    class="name"
                                    v-model="userName"
                                />
                            </div>
                            <div class="label">
                                <i class="icon_lock"></i>
                                <input
                                    type="password"
                                    placeholder="输入登录密码"
                                    class="password"
                                    v-model="password"
                                    @keyup.enter="submit"
                                />
                            </div>
                            <div class="label">
                                <input
                                    type="text"
                                    placeholder="输入验证码"
                                    class="vcode"
                                    v-model="vcode"
                                    @keyup.enter="submit"
                                />
                                <label>3629</label>
                            </div>

                            <div class="error" v-show="showError">用户名或密码错误，请重新输入</div>

                            <button class="button" @click="submit">登 录</button>
                        </div>
                    </dv-border-box-13>
                </div>

                <div class="copyright">Copyright ©2020 沪ICP备133311451号-6</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: "",
            password: "",
            vcode: "",
            showError: false,
        };
    },
    methods: {
        submit() {
            let _this = this;

            if (!_this.userName || !_this.password) {
                _this.showError = true;
                _this.userName = "";
                _this.password = "";
                _this.vcode = "";
                return;
            }

            var token = window.localStorage.getItem("token");
            this.axios({
                url:
                    "http://test.soot.xhs-sz.com:9065/api/v1/user/authrization",
                method: "post",
                data: {
                    userName: _this.userName,
                    password: _this.password,
                    // vcode: _this.vcode,
                },
            })
                .then((res) => {
                    if (res && res.data.resultCode == 0) {
                        let data = res.data.data;
                        window.localStorage.setItem("token", data.accessToken);

                        _this.$router.push({ path: "/home" });
                    } else {
                        _this.showError = true;
                        _this.userName = "";
                        _this.password = "";
                        _this.vcode = "";
                        return;
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
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/bg.jpg) no-repeat;
    background-size: 100% 100%;
    .overbg {
        width: 100%;
        height: 100%;
        background: url(../assets/img/overbg.png) repeat;
    }
    .main {
        width: 386px;
        height: 583px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        h1 {
            font-weight: 300;
            font-size: 28px;
            letter-spacing: 4px;
            line-height: 40px;
        }
        p {
            color: #07a6de;
            line-height: 40px;
            font-size: 20px;
            letter-spacing: 1px;
            &::before {
                content: "";
                display: inline-block;
                vertical-align: 4px;
                margin-right: 20px;
                width: 45px;
                height: 1px;
                background: #1555a0;
            }
            &::after {
                content: "";
                display: inline-block;
                vertical-align: 4px;
                margin-left: 20px;
                width: 45px;
                height: 1px;
                background: #1555a0;
            }
        }
        .copyright {
            margin-top: 25px;
            color: #cdd6de;
        }
        .box {
            height: 433px;
        }
        .formbox {
            height: 433px;
            padding: 34px 30px;
            box-sizing: border-box;
            position: relative;
            span {
                font-weight: 100;
                font-size: 18px;
                text-align: left;
                color: #1472a3;
                display: block;
                letter-spacing: 1px;
            }
            input {
                width: 100%;
                height: 50px;
                line-height: 50px;
                border: 1px solid #1d72b8;
                display: inline-block;
                border-radius: 3px;
                overflow: hidden;
                background: none;
                position: relative;
                font-size: 16px;
                color: #7d89a1;
                padding: 0 10px 0 45px;
                box-sizing: border-box;
                &.name {
                    &::before {
                        content: "";
                        width: 20px;
                        height: 20px;
                        background: red;
                        position: absolute;
                        left: 10px;
                        z-index: 10;
                    }
                }

                &.vcode {
                    width: 65%;
                    float: left;
                    box-sizing: border-box;
                }
            }
            .label {
                margin-top: 25px;
                overflow: hidden;
                position: relative;
                i {
                    width: 24px;
                    height: 24px;
                    float: left;
                    position: absolute;
                    left: 10px;
                    top: 12px;
                    &.icon_man {
                        background: url(../assets/img/icon_man.png) no-repeat;
                        background-size: contain;
                    }
                    &.icon_lock {
                        background: url(../assets/img/icon_lock.png) no-repeat;
                        background-size: contain;
                    }
                }
                label {
                    width: 35%;
                    height: 38px;
                    line-height: 38px;
                    margin-top: 6px;
                    float: right;
                    background: #17517d;
                    letter-spacing: 5px;
                    font-size: 18px;
                }
            }
            .error {
                width: 100%;
                height: 44px;
                line-height: 44px;
                margin-top: 11px;
                color: #fdba1b;
                font-size: 15px;
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0),
                    rgba(217, 195, 249, 0.35),
                    rgba(255, 255, 255, 0)
                );
            }
            .button {
                width: calc(~"100% - 60px");
                height: 50px;
                line-height: 50px;
                background: #006eb6;
                border: 1px solid #0596d5;
                font-size: 18px;
                position: absolute;
                bottom: 34px;
                cursor: pointer;
                left: 30px;
                color: #fff;
            }
        }
    }
}
</style>