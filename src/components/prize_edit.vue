<template>
    <display>
        <template slot="main">
            <el-form  label-position='right' label-width="80px" :model="form_data">
                <div>
                    <el-row>
                        <el-col :span="12"><div>
                            <el-form-item label="编号">
                                <el-input disabled v-model="form_data.id" ></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div>
                             <el-form-item required label="名称">
                                <el-input v-model="form_data.prize_name"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div>
                            <el-form-item required label="价格">
                                <el-input v-model="form_data.price"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div>
                            <el-form-item label="轮次">
                                <el-select v-model="form_data.round" placeholder="请选择轮次">
                                    <el-option label="第一轮" value="第一轮"></el-option>
                                    <el-option label="第二轮" value="第二轮"></el-option>
                                    <el-option label="第三轮" value="第三轮"></el-option>
                                </el-select>
                            </el-form-item></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div>
                            <el-form-item label="图片">
                                <input type="file" class="file" name="file" @change="upload" >
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div>
                            <el-form-item label="奖品信息">
                                <el-input v-model="form_data.prize_info"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </div>
                    <div class="form_button">
                        <span style="padding:0 80px"><el-button type="primary" @click="submitForm('form_data')">提交</el-button></span>
                        <span style="padding:0 0 0 40px"><el-button type="danger" @click="deleteForm('form_data')">删除</el-button></span>
                         <span style="padding:0 0 0 100px"><el-button @click="goBack()">返回</el-button></span>
                    </div>
            </el-form>
        </template>
    </display>
</template>

<script>
    import display from './common/display'
    import baseUrl from '../../config/config'
    import axios from 'axios'
    export default {
        name:'prize_edit',
        components:{
            "display":display
        },
        data(){
            return {
                form_data:{
                    id:'',
                    // prize_id:'',
                    prize_name:'',
                    price:'',
                    round:'',
                    imgUrl:'',
                    prize_info:''
                }
            }
        },
        methods :{
           submitForm(formData){
               var _this = this
               var data = _this.form_data
               axios.post(baseUrl.basePath+'/home/prize_edit',{
                  // id:data.id,
                   prize_id:data.id,
                   prize_name: data.prize_name,
                   price: data.price,
                   prize_info: data.prize_info,
                   round:data.round,
                   imgUrl:data.imgUrl
               }).then(function(res){
                if(res.status == '200'){
                     _this.$message({
                        showClose:true,
                        message:'操作成功',
                        type:'success',
                    })
                    setTimeout(() =>{
                        _this.$router.go(-1)
                    },2000)
                }else{
                    _this.$message({
                        showClose:true,
                        message:'操作失败',
                        type:'error'
                    })
                }
               }).then(function(err){
                   console.log(err)
               })
           },
            deleteForm(formData){
                var _this = this
                var data = _this.form_data
                    this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios({
                            method:'delete',
                            url:baseUrl.basePath+'/home/prize_delete',
                            data:{
                                prize_id:data.id
                            }
                        }).then(function(res){
                            if(res.status == '200'){
                                _this.$message({
                                    showClose:true,
                                    message:'删除成功',
                                    type:'success'
                                })
                                setTimeout(() =>{
                                    _this.$router.go(-1)
                                },2000)
                            }else{
                                _this.$message({
                                    showClose:true,
                                    message:'删除失败',
                                    type:"error"
                                })
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                },
                    upload(e){
                        var _this = this
                        let file = e.target.files[0];      
                        let param = new FormData();
                        param.append('file',file,file.name);
                        param.append('chunk','0');
                    // console.log(param.get('file')); 
                        let config = {
                            headers:{'Content-Type':'multipart/form-data'}
                        };  //添加请求头
                        axios.post(baseUrl.basePath+'/home/upload',param,config)
                        .then(response=>{
                            _this.form_data.imgUrl = response.data
                        }).catch(function(err){
                        })      
                    },
                goBack(){
                    this.$router.go(-1)
                }
        },
        mounted() {
            var _this = this
            var prize_id = _this.$router.history.current.query.prize_id
            axios.get(baseUrl.basePath+"/home/prize_info",{
                params:{
                    prize_id:prize_id
                }
            }).then(function(res){
                _this.form_data = res.data[0]
            }).then(function(err){
                console.log(err)
            })
        },
        

    }
</script>
    
<style>
    /* .el-form-item{
       padding: 0 50px
    } */
    .el-row{
        padding: 30px 0 0 0
    }
    .el-col{
        padding: 0 0 0 50px
    }
</style>
