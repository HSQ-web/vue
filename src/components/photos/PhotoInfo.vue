<template>
    <div class="photoinfo-container">
     <h3>{{ photoinfo.title }}</h3>
     <p class="subtitle">
       <span>发表时间:{{  photoinfo.add_time | dataFormat }}</span>
       <span>点击: {{  photoinfo.click }}次</span>
     </p>

    <hr>

    <!-- 缩略图区域 -->
       <div class="thumbs">
      <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
        <vue-preview :slides="list"></vue-preview>
      </div> 
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 现成的评论子组件 -->
    <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
//放置现成的组件  第一步 导入组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
        id:this.$route.params.id,
        photoinfo:{},
        list:[]
        };
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
     getPhotoInfo(){
        this.$http.get("api/getimageInfo/" + this.id).then(result => {
                if(result.body.status === 0){
                this.photoinfo = result.body.message[0];
                }
        }) 
     },
     getThumbs(){
         this.$http.get("api/getthumimages/" + this.id).then(result => {
        //缩略图插件要求图片宽和高 w 和 h 所以我们拿到的数据循环每一项去处理一下
          result.body.message.forEach(item => {
           item.h = 200;
           item.w = 200;
           item.msrc = item.src
         });
         this.list = result.body.message;
         })
     }
    },
    components:{
        'cmt-box':comment //第二步注册  以标签形式引用
    }
}
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
