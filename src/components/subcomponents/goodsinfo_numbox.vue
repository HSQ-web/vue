<template>
  <div>
         <div class="mui-numbox" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
  </div>    
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted(){
        mui(".mui-numbox").numbox()
    },
    methods:{
      // this.$refs.numbox.value 是 拿到value 值
       countChanged(){
       this.$emit("getcount",parseInt(this.$refs.numbox.value));
       }
    },
    props:["max"],
     watch: {
    // 属性监听
      max:function(newVal, oldVal) {
      // 使用 JS API 设置 numbox 的最大值
       mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
