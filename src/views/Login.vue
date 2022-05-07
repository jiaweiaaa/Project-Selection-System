<template>
    <div class="login-page">
        <div class="login-content">
            <div class="bg-container">
                <img class="login-image" src="../assets/login_bg.jpg" alt="">
            </div>
            <div class="login-form-container">
                <div class="login-title">LOG IN</div>
                <div class="email-input-wrapper login-input-wrapper">
                    <el-input v-model="email" autofocus @keyup.enter.native="login" class="email-input" placeholder="email" @input="clearError('email')"></el-input>
                    <div class="error-notification" v-show="error.email.isShow">{{error.email.message}}</div>
                </div>
                <div class="password-input-wrapper login-input-wrapper">
                    <el-input v-model="password" @keyup.enter.native="login" class="password-input" type="password" show-password placeholder="password" @input="clearError('password')" ></el-input>
                    <div class="error-notification" v-show="error.password.isShow">{{error.password.message}}</div>
                </div>
                <div class="login-button-wrapper">
                    <div class="login-btn" @click="login">Log in</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loginApi from '@/api/login'
import CONSTANTS from '@/utils/constants'
import cookies from 'js-cookie'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: {
                email: {
                    isShow: false,
                    message: 'Email required'
                },
                password: {
                    isShow: false,
                    message: 'Password required'
                }
            }
        }
    },
    methods: {
        login() {
            let loginData = {
                email: this.email,
                password: this.password
            }
            
            if (this.validateBeforeLogin()) {
                loginApi.login(loginData).then(response => {
    
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        let token = response.data.token
                        // TODO
                        cookies.set('token', token)
                        loginApi.getStudentInfo().then(response => {
                            let student = response.data.student
                            cookies.set('student', response.data.student)
                            this.$store.dispatch('user/login', {token, student})
                            // TODO
                            // change /admin
                            this.$router.push('/home/index')
                        })
                        return
                    }
    
                    if (response.code == CONSTANTS.RESPONSE_CODE.EMAIL_NOT_EXIST) {
                        this.error.email.message = 'Email not exist'
                        this.error.email.isShow = true
                        return
                    }

                    if (response.code == CONSTANTS.RESPONSE_CODE.ERROR_PASSWORD) {
                        this.error.password.message = 'Passowrd not correct'
                        this.error.password.isShow = true
                        return
                    }
                })
            }
        },
        validateBeforeLogin() {
            if (this.email.trim() == '') {
                this.error.email.message = 'Email cannot be empty'
                this.error.email.isShow = true
                return false
            }

            let email_reg = new RegExp(CONSTANTS.REG.EMAIL_REG)
            if (!email_reg.test(this.email)) {
                this.error.email.message = 'Email format error'
                this.error.email.isShow = true
                return false
            }

            if (this.password == '') {
                this.error.email.message = 'Password cannot be empty'
                this.error.password.isShow = true
                return false
            }

            return true
        },
        clearError(label) {
            this.error[label].isShow = false
        }
    }
}
</script>


<style lang="scss" scoped>
.login-page {
    min-height: 100%;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding: 200px 60px;
    background-color: white;
    .login-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-image {
        width: 500px;
        margin-right: 30px;
    }
    .login-form-container {
        padding: 40px 40px 60px 40px;
        background-color: #fefceb;
        border-radius: 5px;
        box-shadow: 1px 1px 6px #d8d8d8f2;
        .email-input, .password-input {
            width: 300px;
        }
        .login-input-wrapper {
            margin-bottom: 20px;
        }
        .error-notification {
            color: red;
            margin-top: 10px;
            padding-left: 5px;
            font-size: 12px;
        }
        .login-input {
        }
        .login-title {
            text-align: center;
            font-weight: bold;
            margin-bottom: 30px;
            font-size: 20px;
        }
        .login-button-wrapper {
            text-align: right;
        }
        .login-btn {
            display: inline-block;
            background-color: white;
            padding: 10px 35px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            border: 1px solid #ffe564;
        }
    }
}
</style>