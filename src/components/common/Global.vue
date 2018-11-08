<template>  
    <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
        </el-menu-item>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航二</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<script>
    export default {
        name :"display",
        data(){
            return{}
        },
        methods:{
            // handleOpen(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // handleClose(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // handleSelect(key,keyPath){
            //     console.log(key,keyPath)
            // }
        }
    }
</script>
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
  }
  
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    /* line-height: 50px; */
  }
  
</style>
