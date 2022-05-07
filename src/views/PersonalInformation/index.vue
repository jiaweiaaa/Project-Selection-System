<template>
    <el-container class="info-container">
        <el-card class="info-card">
            <div class="top">
                 <el-avatar class="avatar" v-if="student.avatar" shape="circle" :src="student.avatar"></el-avatar>
            <el-avatar class="avatar" v-else shape="circle" :src="require('../../assets/default-avatart.png')"></el-avatar>
            
            </div>
            <div class="bottom">
                <el-form status-icon label-width="200px" >
                    <div class="row1">
                        <b><el-form-item label="SID :">
                            <!-- <el-input disabled clearable style="width:300px" v-model="student.sid"></el-input> -->
                            <span>{{student.sid}}</span>
                        </el-form-item></b>
                    </div>
                    <div class="row2">
                        <b><el-form-item label="Name :">
                            <!-- <el-input disabled clearable style="width:300px" v-model="student.name"></el-input> -->
                            <span>{{student.name}}</span>
                        </el-form-item></b>
                    </div>
                    <div class="row4">
                        <b><el-form-item label="Email :">
                            <!-- <el-input disabled  clearable style="width:300px" v-model="student.email"   ></el-input> -->
                            <span>{{student.email}}</span>
                        </el-form-item></b>
                    </div>
                </el-form>
                <div class="button">
                    <el-button class="edit" @click="editPage" >Edit</el-button>
                </div>
            </div>
        </el-card>
    </el-container>
</template>


<script>
import { mapGetters } from 'vuex'
import loginApi from '@/api/login'

 export default {
    data() {
      return {
        imageUrl:'',
        student: {
            sid:'',
            name:'',
            major: '',
            email: '',
            avatar:''
        },
      };
    },
    created(){
         this.getStudentInfo()
    },
    methods:{
         getStudentInfo(){
            loginApi.getStudentInfo().then(response =>{
                console.log(response)
                this.student.id= response.data.student.id
                this.student.sid= response.data.student.sid
                this.student.name= response.data.student.name
                this.student.email= response.data.student.email
                this.student.avatar = response.data.student.avatar
            })
        },
        editPage(){
            this.$router.push({name:'ChangePassword'})
        }
        
    },
    computed: {
        ...mapGetters([
            'currentStudent'
        ]),
   }
 }
</script>


<style lang="scss" >
.info-container{
    width:1301px;
    height:657px;
    position: relative;
    background:#f8f8f8 url('../../assets/homeCircle.png') no-repeat -10px bottom;
    .info-card{
        position: absolute;
        left:18%;
        height: calc(90% - 10px);
        width: calc(75% - 10px);
    .top{
        position:absolute;
        left:40%;
        top:10%;
        .avatar-uploader .el-upload {
            border: 2px dashed #141414;
            border-radius: 100px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #4340ff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
        }
        .avatar {
            width: 170px;
            height: 170px;
            display: block;
        }
    }
    .bottom{
        position:absolute;
        left:15%;
        top:50%;
    }
    .el-input.is-disabled .el-input__inner {
        background-color: #ffffff;
        border-color: #ffffff;
        color: #303133;
        cursor: not-allowed;
        border-width: 0px;
        font-size: 15px;
        font-weight: inherit
    }
    .el-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #f5df4e;
        border: 1px solid #DCDFE6;
        color: #ffffff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 18px;
        font-family: ui-sans-serif;
        border-radius: 4px;
        border-width: 0px;
        width: 100px;
    }
    .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 15px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        font-weight: bold;
    }
    .button{
        position:absolute;
        left:160%;
        top: 110%;
    }
    }
}

</style>