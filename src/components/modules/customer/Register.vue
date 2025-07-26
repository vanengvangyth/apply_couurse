<script setup lang="ts">
import { reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
// import axios from 'axios';
import { useRouter } from 'vue-router';
import { useRegister } from './composible/register.ts';
import { notification } from 'ant-design-vue';
const error = ref('');


const router = useRouter();
const { register } = useRegister();

interface FormState {
    email: string;
    password: string;
    username: string;
}

const formState = reactive<FormState>({
    email: '',
    password: '',
    username: '',
});

const isLoading = ref(false);

const onFinish = async (values: any) => {
    try {
        isLoading.value = true;
        await register(values);
        clear();
        notification.open({
            message: 'ລົງທະບຽນ ສຳເລັດ',
            description: 'ການລົງທະບຽນ ສຳເລັດເເລ້ວ.',
            style: {
                width: '500px',
                marginLeft: `${335 - 600}px`,
                backgroundColor: '#e6ffed',
                borderLeft: '5px solid #52c41a',
                color: '#135200',
            },
            duration: 3,
        });
        isLoading.value = false;
    } catch (err: any) {
        console.error('Registration failed:', err);
    } finally {
        isLoading.value = false;
    }
};

const clear = () => {
    formState.email = '';
    formState.password = '';
    formState.username = '';
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const goToLogin = () => {
    router.push({ name: 'login' });
};

</script>

<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed" class="login-form">
        <h2 style="text-align: center;">ລົງທະບຽນ ນັກສືກສາ</h2>

        <a-form-item label="ຊື່ຜູ້ໃຊ້" name="username" :rules="[
            { required: true, message: 'Please input your username!' }
        ]">
            <a-input v-model:value="formState.username" size="large">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="ອີເມວ" name="email" :rules="[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not a valid email!' }
        ]">
            <a-input v-model:value="formState.email" size="large">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="ລະຫັດຜ່ານ" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password" size="large">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <a-button type="primary" html-type="submit" block size="large" :loading="isLoading" style="margin-top: 10px;">
                Submit
            </a-button>
        </a-form-item>

        <a-form-item>
            <a-button type="default" block size="large" @click="goToLogin">
                ເຂົ້າສູ່ລະບົບ
            </a-button>
        </a-form-item>

        <p v-if="error" style="color: red">{{ error }}</p>
    </a-form>
</template>

<style lang="scss" scoped>
.login-form {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #e7e4e4;
    border-radius: 8px;
}
</style>