<template>
    <div>
        <display style="background-color: #E9EEF3;">
            <template slot="main" >
               <div>
                   <div style="padding:0 0 15px 0;float:right"><el-button type="primary" plain @click="add_prize()">新增</el-button></div>
                    <el-table
                    :data="tableData"
                    height="400"
                    style="width: 100%">
                    <el-table-column fixed prop="id" label="编号" width="300"></el-table-column>
                    <el-table-column prop="prize_name" label="名称" width="300"></el-table-column>
                    <el-table-column prop="price" label="价格" width="300"></el-table-column>
                    <el-table-column prop="round" label="轮次" width="300"></el-table-column>
                    <el-table-column prop="imgUrl" label="图片" width="300">
                        <template slot-scope="scope">
                            <img :src="scope.row.imgUrl" style="width:50px">
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="prize_info" label="信息" width="200"></el-table-column> -->
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <!-- <el-button type="text" size="small">编辑</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                 <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
                <div  style="padding:10px 0 0px 0;float:right"><el-button type="text" icon="el-icon-refresh" @click="Fun_refresh()">刷新</el-button></div>
               </div>
            </template>
        </display>
    </div>
</template>
<script>
    import display from './common/display'
    import baseUrl from '../../config/config'
    import axios from 'axios'
    import Vue from 'Vue'
    export default {
        name :'Home',
        components : {
            "display":display
        },
        data(){
            return {
                tableData:[],
                total:new Number,
                pageSize:10,
                currentPage: 1,
                //pageNum:1    
            }
        },
        methods :{
            handleClick(row) {
                this.$router.push({
                    path:'./prize_edit?prize_id='+row.id
                })
            },
             handleSizeChange(vals) {
                var _this = this
                _this.pageSize = vals
                axios.get(baseUrl.basePath+'/home/prize_list',{
                    params :{
                        pageNum:1,
                        pageSize:vals,
                    }
                }).then(function(res){
                    _this.tableData = res.data.result1,
                    _this.total = res.data.result
                }).catch(function(error){
                    console.log(error)
                })
            },
            handleCurrentChange(val) {
                var _this = this
                axios.get(baseUrl.basePath+'/home/prize_list',{
                    params :{
                        pageNum:`${val}`,
                        pageSize:_this.pageSize,
                    }
                }).then(function(res){
                    _this.tableData = res.data.result1,
                    _this.total = res.data.result
                }).catch(function(error){
                    console.log(error)
                })
            },
            add_prize(){
                this.$router.push({
                    path:'./prize_add'
                })
            },
            Fun_refresh(){
            var _this = this
            console.log(_this)
            axios.get(baseUrl.basePath+'/home/prize_list',{
                params :{
                    pageNum:1,
                    pageSize:_this.pageSize,
                }
            }).then(function(res){
                _this.tableData = res.data.result1,
                _this.total = res.data.result
            }).catch(function(error){
                console.log(error)
            })
            }
        },
        mounted() {
            var _this = this
            axios.get(baseUrl.basePath+'/home/prize_list',{
                params :{
                    pageNum:1,
                    pageSize:_this.pageSize,
                }
            }).then(function(res){
                _this.tableData = res.data.result1,
                _this.total = res.data.result
            }).catch(function(error){
                console.log(error)
            })
        },     
    }

</script>
<style>
    .block{
        padding: 10px 0 0 0;
        float: left;
    }  
</style>

