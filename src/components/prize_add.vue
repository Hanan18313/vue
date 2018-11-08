<template>
    <display>
        <template slot="main">
            <el-form label-position='right' label-width="80px" :model="form_data" class="demo-ruleForm" >
                <div>
                    <el-row>
                        <el-col :span="12"><div>
                            <el-form-item label="名称">
                                <el-input v-model="form_data.prize_name"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div>
                            <el-form-item label="价格" >
                                <el-input v-model="form_data.price"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div>
                            <el-form-item label="图片">
                                <input type="file" class="file" name="file" @change="upload" >
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div>
                            <el-form-item label="奖品信息" >
                                <el-input v-model="form_data.prize_info" auto-complete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div>
                            <el-form-item label="数量" >
                                <el-input v-model="form_data.number" auto-complete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </div>
                <div class="form_button">
                        <span style="padding:0 80px"><el-button type="primary" @click="submitForm('form_data')">提交</el-button></span>
                        <span style="padding:0 0 0 80px"><el-button  @click="cancel()">取消</el-button></span>
                </div>
            </el-form>
        </template>
    </display>
</template>

<script>
import display from './common/display'
import axios from 'axios'
import baseUrl from '../../config/config'
export default {
    name:'prize_add',
    components:{
        "display":display,
    },
    data(){
        return {
            form_data:{
                prize_name:'',
                price:'',
                imgUrl:'',
                prize_info:'',
                number:'',
            }
        }
    },
    methods:{
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
        submitForm(formName){
            var _this = this
            axios.post(baseUrl.basePath+'/home/prize_add',{
               data:this.form_data
            }).then(res =>{
                if(res.status == '200'){
                    _this.$message({
                        showClose:true,
                        message:'添加成功！',
                        type:'success'
                    })
                    setTimeout(() =>{
                        _this.$router.replace({
                            path:'/home'
                        })
                    },2000)
                }else{
                    _this.$message({
                        showClose:true,
                        message:'添加失败',
                        type:'error'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        cancel(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>
    .el-form-item{
       padding: 0 50px
    }
    .el-input{
        width: 100%
    }
    .el-row{
        padding: 30px 0 0 0
    }
    .el-col{
        padding: 0 0 0 50px
    }
</style>
