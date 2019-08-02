<template>
     <div class="desc-container">
    <h3>{{ descinfo.title}}</h3>
    <hr>
    <div class="content" v-html="descinfo.content"></div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
          descinfo:{}
        };
    },
    created(){
       this.getDescInfo();
    },
    methods:{
         getDescInfo(){
         this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(result => {
            if (result.body.status === 0 ) {
                this.descinfo = result.body.message[0];
            }

        })

         }

    }
}
</script>
<style lang="scss">
.desc-container{
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content img{
     width: 100%;
  }
}
</style>
