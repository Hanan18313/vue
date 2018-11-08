<template>
    <display style="background-color: #E9EEF3;">
            <template slot="main" >
               <div>
                    <div style="padding:0 0 15px 0;width:300px;float:right"><el-input placeholder="请输入名字或签到号" v-model="search_input"><el-button type="primary" slot="append" icon="el-icon-search" @click="search()"></el-button></el-input></div>
                    <el-table
                    :data="tableData"
                    height="400"
                    style="width: 100%">
                    <el-table-column fixed prop="id" label="编号" width="260"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="260"></el-table-column>
                    <el-table-column prop="company" label="公司" width="300"></el-table-column>
                    <el-table-column prop="is_lunch" label="是否午宴" width="260">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.is_lunch" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="抽奖号" width="200">
                        <template slot-scope="scope">
                            <el-input style="width:100px;text-align:center" :value="scope.row.signIn_id" v-model="scope.row.signIn_id" :name="signIn_id"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="portrait" label="头像" width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.portrait" style="width:50px">
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="prize_info" label="信息" width="200"></el-table-column> -->
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope)" type="text" size="small">提交</el-button>
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
</template>

<script>
import display from './common/display'
import axios from 'axios'
import baseUrl from '../../config/config'
export default {
    name:'member',
    components:{
        "display":display
    },
    data(){
        return {
            tableData:[],
            total:new Number,
            pageSize:10,
            currentPage: 1,
            signIn_id:'',
            search_input:'',
            options:[{
                value:'1',
                label:'是'
            },{
                value:'0',
                label:'否'
            }],
            value:''
        }
    },
    methods:{
        handleClick(row){
            var _this = this
            if(row.row.signIn_id != null){
                axios.post(baseUrl.basePath+'/home/member_update',{
                    data:row.row
                }).then(function(res){
                    if(res.status == '200'){
                        _this.$message({
                            showClose:true,
                            message:'操作成功！',
                            type:'success'
                        })
                    }
                }).catch(function(err){
                    console.log(err)
                })
            }else{
                _this.$message({
                    showClose:true,
                    message:'请输入抽奖号！',
                    type:'error'
                })
            }
        },
        handleSizeChange(vals){
            var _this = this
            _this.pageSize = vals
            axios.get(baseUrl.basePath+'/home/member_list',{
                params :{
                    pageNum:1,
                    pageSize:`${vals}`,
                }
            }).then(function(res){
                _this.tableData = res.data.result1,
                _this.total = res.data.result
            }).catch(function(error){
                console.log(error)
            })
        },
        handleCurrentChange(val){
            var _this = this
            axios.get(baseUrl.basePath+'/home/member_list',{
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
        search(){
            var _this = this
            if(_this.search_input != ''){
                    axios.get(baseUrl.basePath+'/home/search_member',{
                    params:{
                        search_input:_this.search_input
                    }
                }).then(function(res){
                    _this.tableData = res.data;
                }).catch(function(err){
                    console.log(err)
                })
            }else{
                _this.$message({
                    showClose:true,
                    message:'搜索框内不能为空！',
                    type:'error'
                })
            }
        },
        Fun_refresh(){
            var _this = this
            axios.get(baseUrl.basePath+'/home/member_list',{
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
        axios.get(baseUrl.basePath+'/home/member_list',{
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
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }  
</style>
