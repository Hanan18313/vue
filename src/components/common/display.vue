<template>
    <el-container>
        <el-header>
            <div><img style="width:200px;padding:10px 0 0 0;float:left" src="../../assets/new_logo.png" alt=""></div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <slot name="aside">
                    <el-menu
                    id="nav"
                    :default-active="this.$router.history.current.path"
                    class="el-menu-vertical-demo"
                    router 
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                            <i class="el-icon-menu"></i>
                            {{item.navItem}}
                        </el-menu-item>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>抽奖</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="(item,i) in navItemList" :key="i" :index="item.name">
                                    {{item.nav_item}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </slot>
            </el-aside>
            <el-main>
                <slot name="main"></slot>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        name :"display",
        data(){
            return{
                //activeIndex:'',
                navList:[
                   // {name:'/home',navItem:'首页'},
                    {name:'/prize_view',navItem:'奖品'},
                    {name:'/member_view',navItem:'会员'},
                   // {name:'/draw_view',navItem:'抽奖'}
                ],
                navItemList:[
                    {name:'/draw',nav_item:'第一轮'},
                    {name:'/draw',nav_item:'第二轮'},
                    {name:'/draw',nav_item:'第三轮'}
                ]
            }
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key,keyPath){

            }
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
