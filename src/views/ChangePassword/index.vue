<template>
    <el-container class="pw-container">
        <el-card class="pw-card">
            <div class="left-side">
                   <el-avatar class="avatar" v-if="student.avatar" shape="circle" :src="student.avatar"></el-avatar>
            <el-avatar class="avatar" v-else shape="circle" :src="require('../../assets/default-avatart.png')"></el-avatar>
            
            <el-button class="change" type="primary" icon="el-icon-upload" @click="imagecropperShow=true"><b>change</b>
            </el-button>
            <image-cropper v-show="imagecropperShow" :key="imagecropperKey" :url="'/student/uploadStudentHeadPortrait'" @close="close" field="file" :params="student" langType="en" @crop-upload-success="cropSuccess" />
            </div>
            <div class="line" />
            <div class="right-side">
                <el-form status-icon label-width="200px" :rules="rules" >
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
                    <div class="row3">
                        <b><el-form-item label="Email :">
                            <!-- <el-input disabled  clearable style="width:300px" v-model="student.email"   ></el-input> -->
                            <span>{{student.email}}</span>
                        </el-form-item></b>
                    </div>
                      <div class="row4">
                        <b><el-form-item label="Password :">
                            <el-input clearable type="password" style="width:300px" v-model="student.password"   ></el-input>
                            
                        </el-form-item></b>
                    </div>
                </el-form>
                <div class="button">
                    <el-button class="cancel"  @click='Cancel' >Cancel</el-button>
                    <el-button class="confirm" @click='UpdatePw(student)' >Confirm</el-button>
                </div>
            </div>
        </el-card>
    </el-container>
</template>

<script>
import studentApi from '@/api/student'
import ImageCropper from '@/components/ImageCropper';
import { mapGetters } from 'vuex'
import loginApi from '@/api/login'

export default {
    inject:['reload'],  
    data() {
      return {
          imagecropperShow: false,
            imagecropperKey: 0,
        student:{
            id:'',
            sid:'',
            name:'',
            email:'',
            password:'',
            avatar:''
        },
        rules:{
            password: [
                { message: "Please fill in with your password", trigger: 'blur' }
          ],
        }
      }
    },
    created(){
        // console.log(this.currentStudent)
        // this.student.id = this.currentStudent.id
        // this.student.sid = this.currentStudent.sid
        // this.student.name = this.currentStudent.name
        // this.student.email = this.currentStudent.email
        // this.student.avatar = this.currentStudent.avatar
        this.getStudentInfo()
    },
    components: {
        ImageCropper
    },
    computed: {
        ...mapGetters([
            'currentStudent'
        ]),
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
         close() {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1;
            
        },
        cropSuccess() {

            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
            this.reload()
        },
        UpdatePw(student){
            if (student.password != ''){
                studentApi.updateStudent(student)
                .then((response) =>{
                    this.student = student
                    this.$message({
                        type:'success',
                        message:'Change Password Successfully !'
                    })
                    this.$router.push({name:"PersonalInformation"})
                })
        }else{
            this.$message({
                type:'error',
                message:'Password can not be empty !'
                 })
        }
        },
        Cancel(){
            this.$router.push({name:'PersonalInformation'})
        }
    }
}
</script>

<style lang="scss" >
.pw-container{
    width:1301px;
    height:657px;
    position: relative;
    background:#f8f8f8 url('../../assets/homeCircle.png') no-repeat -10px bottom;
    .pw-card{
        position: absolute;
        left:18%;
        height: calc(90% - 10px);
        width: calc(75% - 10px);
    }
    .left-side{
        position:absolute;
        left:12%;
        top:30%;
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
            width: 200px;
            height: 200px;
            line-height: 200px;
            text-align: center;
        }
        .avatar {
            width: 200px;
            height: 200px;
            display: block;
        }
    }
    .line{
        position: absolute;
        left:35%;
        top:10%;
        width: 0.2em;
        height: 500px;
        margin-right: 1em;
        margin-left: 5em;
        background:#0a0a0a;
    }
    .right-side{
        position:absolute;
        left:40%;
        top:25%;
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
    .cancel{
        position:absolute;
        left:50%;
        top: 120%;
        background-color: rgb(170, 169, 169);
        width:100px
    }
    .confirm{
        position:absolute;
        left:80%;
        top: 120%;
    }
    .change{
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
        font-size: 14px;
        border-radius: 4px;
        border-width: 0px;
        width: 100px;
        margin-left: 90%;;
    }
}
</style>