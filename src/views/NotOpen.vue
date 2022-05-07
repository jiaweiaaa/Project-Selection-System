<template>
    <div class="not-open-page"> 
        <img src="../assets/not-open.png" alt="" class="not-open-image">
        <div class="notification">Sorry this system is not open now ....</div>
    </div>
</template>

<style lang="scss" scoped>
    .not-open-page {
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .not-open-image {
            width: 500px;
            margin-bottom: 30px;
        }
        .notification {
            font-size: 18px;
        }
    }
</style>