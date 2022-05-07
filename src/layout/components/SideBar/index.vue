<template>
    <div class="side-bar-wrapper">
        <div class="logo-wrapper">
            <img class="logo" src="../../../assets/usyd-logo.png"/>
        </div>
        <div class="menu-wrapper">
            <div class="home">
                <el-tooltip class="item" effect="dark" content="Home" placement="top-start">
                    <i class="el-icon-s-home menu-icon" :class="{'active': currentRoute == '/home/index'}"  @click="to('/home/index')"></i>
                </el-tooltip>
            </div>
            <div class="groups">
                <el-tooltip class="item" effect="dark" content="Group" placement="top-start">
                    <i class="el-icon-s-custom menu-icon" :class="{'active': currentRoute == '/groups/index'}" @click="to('/groups/index')"></i>
                </el-tooltip>
            </div>
            <div class="projects">
                <el-tooltip class="item" effect="dark" content="Projects" placement="top-start">
                    <i class="el-icon-document menu-icon" :class="{'active': currentRoute == '/projects/index'}" @click="to('/projects/index')"></i>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed: {
        currentRoute () {
            return this.$route.path
        }
    },
    methods: {
        to(des) {
            if (this.$route.path == des) {
                return
            }
            this.$router.push(des)
        }
    }

}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.side-bar-wrapper {
    display: flex;
    flex-direction: column;
    width: $sideBarWidth;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 50px 10px 50px 10px;
    border-right: 1px solid rgba(232, 232, 232, .7);

    .logo {
        width: 40px;
        cursor: pointer;
    }
    .menu-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 200px 0;
        justify-content: space-between;
        align-items: center;
        .menu-icon {
            font-size: 30px;
        }
    }
    .logout-text {
        font-size: 14px;
        text-align: center;
    }
    .menu-icon {
        cursor: pointer;
        &:hover {
            color: #5cb6ff;
        }
        &.active {
            color: #5cb6ff;
        }
    }
    .log-out-wrapper {
        cursor: pointer;
    }
}
</style>