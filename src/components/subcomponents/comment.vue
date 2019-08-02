<template>
	<div class="cmt-container">
		<textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postContent">发表评论</mt-button>
	 	<div class="cmt-list" v-for="(item,i) in comment" :key="item.id">
			<div class="cmt-item">
				<div class="cmt-title">
					{{ i+1 }}&nbsp;&nbsp; 用户: {{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dataFormat}}
				</div>
			</div>
			<div class="cmt-body"> {{ item.content }}</div>
		</div>
		 <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
 import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				pageIndex:1,
				comment:[],
				msg:""
			};
		},	
		created(){
			this.getComment();
		},
		methods:{
		getComment(){
			this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
				if (result.body.status === 0) {
					  // this.comments = result.body.message;
                      // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                this.comment = this.comment.concat(result.body.message);
				} else{
					Toast("获取失败")
				}
			})
		},
		getMore(){
			this.pageIndex++;
			this.getComment();
		},
		postContent(){
			 // 判断是否填写为空值
				if(this.msg.trim().length === 0){
				   return Toast("评论不能为空")
				}
		          this.$http.post("api/postcomment/" + this.$route.params.id, { content:this.msg.trim()
		         })
		        .then(result => {
                   	if (result.body.status === 0) {
					 // 手动拼接一个评论对象 
					 var cmt = {
					 user_name:"匿名用户",
					 add_time:Date.now(),
					 content: this.msg.trim()
					 };
					 this.comment.unshift(cmt);
					 this.msg = "";
				} 
		 })
		}
	},
	props:["id"]	
	};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
