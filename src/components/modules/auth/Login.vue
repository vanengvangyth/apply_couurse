<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 24 }"
    :wrapper-col="{ span: 24 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    class="login-form"
  >
    <h2 style="text-align: center;">ຍິນດີຕ້ອນຮັບ ເຂົ້າສູ່ລະບົບ</h2>

    <a-form-item
      label="ອີເມວ"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="ລະຫັດຜ່ານ"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" block size="large" style="margin-top: 10px;">
        ເຂົ້າລະບົບ
      </a-button>
    </a-form-item>

    <a-form-item>
      <a-button type="default" block size="large" @click="goToRegister">
        ລົງທະບຽນ
      </a-button>
    </a-form-item>

    <p v-if="error" style="color: red; text-align: center;">{{ error }}</p>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useAuth } from './composible/auth.ts'; // ปรับ path ให้ตรงกับของคุณ

const router = useRouter();
const { login } = useAuth();

interface FormState {
  email: string;
  password: string;
}

const formState = reactive<FormState>({
  email: 'super_admin@gmail.com',
  password: 'super@1234',
});

const error = ref<string | null>(null);

const onFinish = async (values: any) => {
  try {
    error.value = null;
    await login(values.email, values.password);
    router.push({ name: 'customer' }); // ✅ ไปหน้าหลักหลัง login
  } catch (err: any) {
    error.value = 'Login failed: ' + (err.response?.data?.message || err.message);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const goToRegister = () => {
  router.push({ name: 'register' }); // ✅ ลิงก์ไปหน้า register
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #e7e4e4;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
</style>
