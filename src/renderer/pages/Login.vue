<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>后台管理系统</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="adminName">
                        <el-input v-model="loginForm.adminName" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwd">
                        <el-input type="passwd" placeholder="密码" v-model="loginForm.passwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="savePassWd">记住密码</el-checkbox>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                    </el-form-item>
                </el-form>
                <p class="tip">温馨提示：仅供商家登陆，普通用户禁止使用</p>
            </section>
        </transition>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                savePassWd:false,
                loginForm: {
                    adminName: '',
                    passwd: '',
                },
                rules: {
                    adminName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                showLogin: true,
            }
        },
        mounted(){
            var loginForm = JSON.parse(localStorage.getItem("loginForm")||'{}');
            if (loginForm.adminName){
                this.loginForm=loginForm;
            }
        },
        computed: {

        },
        methods: {
            async submitForm(formName) {

                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.savePassWd){
                            localStorage.setItem("loginForm",JSON.stringify(this.loginForm));
                        } else {
                            localStorage.removeItem("loginForm")
                        }


                       this.$axios.post("/login/adminInfo",this.loginForm).then(res=>{
                            if (res.data.state==0){
                                this.$message.error(res.data.msg);
                                return;
                            } else if (res.data.state==1) {
                                this.$message.success(res.data.msg);

                                this.$router.push('/chooseShop')
                                return;
                            }
                       })

                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
        },
        watch: {
            adminInfo: function (newValue){
                if (newValue.id) {
                    this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
                    this.$router.push('manage')
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    @blue: #3190e8;
    @bc: #e4e4e4;
    @fc:#fff;

    // 背景图片地址和大小
    .bis(@url) {
        background-image: url(@url);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    //定位全屏
    .allcover{
        position:absolute;
        top:0;
        right:0;
    }

    //transform上下左右居中
    .ctt {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    //定位上下左右居中
    .ctp(@width, @height) {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -@height/2;
        margin-left: -@width/2;
    }

    //定位上下居中
    .tb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    //定位左右居中
    .lr {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    //宽高
    .wh(@width, @height){
        width: @width;
        height: @height;
    }

    //字体大小、行高、字体
    .ft(@size, @line-height) {
        font-size: @size;
        line-height:@line-height;
    }

    //字体大小，颜色
    .sc(@size, @color){
        font-size: @size;
        color: @color;
    }

    //flex 布局和 子元素 对其方式
    .fj(@type: space-between){
        display: flex;
        justify-content: @type;

    }
</style>
