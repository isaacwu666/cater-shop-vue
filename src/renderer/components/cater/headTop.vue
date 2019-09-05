<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/cater/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>

	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath:"",
				adminInfo:{
    				id:'1',
					avatar:''
				}
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {

    		}
    	},
    	computed: {

    	},
		methods: {

			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'signout'){
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="less">
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
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 80px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
