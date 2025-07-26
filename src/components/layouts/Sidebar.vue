<template>
    <div class="logo">
        <img src="https://tse3.mm.bing.net/th/id/OIP.j_kxQoi5DYE3XA35JZRenAHaHa?r=0&w=626&h=626&rs=1&pid=ImgDetMain" />
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" class="sidebar-menu" mode="inline">
        <a-menu-item key="1" @click="handMenuClick('customer')">

            <user-outlined />
            <span>Customer</span>
        </a-menu-item>
        <a-menu-item key="2" @click="handMenuClick('coursecategory')">
            <appstore-outlined />
            <span>CourseCategory</span>
        </a-menu-item>

        <a-menu-item key="3" @click="handMenuClick('course')">
            <upload-outlined />
            <span>Course</span>
        </a-menu-item>
        <a-sub-menu key="sub2">
            <template #title>
                <span>
                    <team-outlined />
                    <span>Team</span>
                </span>
            </template>
            <a-menu-item key="6">Team 1</a-menu-item>
            <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {
    UserOutlined,
    TeamOutlined,
    AppstoreOutlined,
    UploadOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const selectedKeys = ref<string[]>([]);

const router = useRouter();

const handMenuClick = (key: string) => {
    router.push({
        name: key
    });
}
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8125rem 0.5rem 0.8125rem 1rem;
    width: 100%;
    height: 100px;
    background: rgba(255, 255, 255, 0.2);

    img {
        width: 4rem;
        height: 4rem;
        margin-right: 0.8rem;
        margin-left: 0.25rem;
        object-fit: contain;
        border-radius: 5px;
    }
}
</style>