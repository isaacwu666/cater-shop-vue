<template>
    <div style="width: 100%;height: 100%">
        <div class="sidebar">

        </div>
           <div style="margin-left: 120px">
               <head-top></head-top>
               <router-view></router-view>
           </div>
    </div>
</template>

<script>
    import headTop from './headTop'

    export default {
        name: "home",
        components: {
            headTop
        },
        methods: {
            handleOpen() {
            },
            handleClose() {
            },
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0px;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 160px;
    }

    .sidebar > ul {
        height: 100%;
    }

</style>