<template>
  <div class="goods-list">
    
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price}}</span>
          <span class="old">￥{{ item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quanlity }}件</span>
        </p>
      </div>
      </router-link> -->
      <!-- 网页中俩种跳转方式
        1. a 标签跳转
        2. 路由编程式导航
       -->
       <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price}}</span>
          <span class="old">￥{{ item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quanlity }}件</span>
        </p>
      </div>
      </div>
     <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
   data(){
   return{
        goodslist:[],
        pageindex:1
   };
   },
   created(){
     this.getGoodsList();
   },
   methods:{
        // 获得goodslist 数据
        getGoodsList(){
           this.$http.get("api/getgoods?pageindex" + this.pageindex)
            .then(result => {
             if(result.body.status === 0){
               this.goodslist = this.goodslist.concat(result.body.message);
             }
          })
        },
        getMore(){
          this.pageindex++;
          this.getGoodsList();
        },
        getDail(id){
        //区分this.$route 和 this.$router
        // 其中: this.route 是路有参数对象，所有的路由中的参数， params,query 都是属于他
        // 其中：this.router 是一个路由导航对象，用它 可以很方便的 用js 代码实现路由的前进和 后退 跳转到新的 URL 地址。
        this.$router.push('/home/goodsinfo/' + id);

        }
   }


}

</script>

<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
    }

    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
