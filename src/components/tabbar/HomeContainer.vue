<template>
	<div>
		  <!--轮播图区域-->
	           
		      <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
		
		  <!--六宫格区域-->
		       <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                     <img src="../../images/menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/menu2.png">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/menu3.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu4.png">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu5.png">
		                    <div class="mui-media-body">视频专区</div></a></li>
		             <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import swiper from '../subcomponents/swiper.vue'
	//请求轮播图数据 向外暴露出去
	export default{
		
		data(){
			
			return{
				
			  lunbotuList:[]	
			}
		},
		//生命周期  在组件创建的时候 就执行getLunbotu() 函数
		created(){
			this.getLunbotu();
		},
		methods:{
			getLunbotu(){
			// 使用vue-resourse this.$http请求数据
				this.$http.get('api/getlunbo').then(result=>{
				//做出判断
					if (result.body.status === 0) {
						this.lunbotuList = result.body.message
					} else{
						
						Toast('获取失败了')
					}
				})
				
			}
			
		},
		components:{
			swiper
		}
	}
  	
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
	background-color: #fff;
	border:none;
	img{
		width: 60px;
		height: 60px;
	 }
	.mui-media-body{font-size: 13px;}
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
	border:0;
}
</style>