<template>
    <transition name="fade">
        <div class="modal-wrapper" v-show="isShow">
            <div class="modal-bg" @click="hideModal"></div>
            <div class="modal-window">
                <div class="modal-header">
                    <div class="modal-title">{{title}}</div>
                    <div class="modal-close-btn">
                        <i class="el-icon-close" @click="hideModal"></i>
                    </div>
                </div>
                <div class="modal-content">
                    <slot name="content"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: [
        'title',
        'isShow'
    ],
    methods: {
        hideModal() {
            this.$emit('hideModal')
        }
    }
}
</script>


<style lang="scss" scoped>
.modal-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    transition: 100ms;
    .modal-bg {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .1);
    }
    .modal-window {
        position: fixed;
        left: 50%;
        top: 50%;
        padding: 20px 30px;
        transform: translateX(-50%) translateY(-80%);
        border-radius: 3px;
        background-color: white;
        z-index: 1;
        min-width: 500px;
    }
    .modal-header {
        position: relative;
        margin-bottom: 25px;
        .modal-title {
            font-weight: bold;
        }
        .modal-close-btn {
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
        }
    }
    .modal-content {
        margin-bottom: 25px;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>