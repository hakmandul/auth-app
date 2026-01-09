<script setup lang="ts">
import { signUp } from '~/lib/auth-client';

const form = reactive({ name: '', email: '', password: '' });
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  const { error } = await signUp.email({
    email: form.email,
    password: form.password,
    name: form.name,
    callbackURL: "/dashboard", // Редирект после успеха (если не используем router.push)
  });

  if (error) {
    alert(error.message); // В реальном проекте используй Toast
    loading.value = false;
  } else {
    router.push('/dashboard');
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Создать аккаунт</h1>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-1">Имя</label>
        <input v-model="form.name" type="text" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" placeholder="John Doe" />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-1">Email</label>
        <input v-model="form.email" type="email" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" placeholder="john@example.com" />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-1">Пароль</label>
        <input v-model="form.password" type="password" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"  placeholder="••••••••" />
      </div>

      <button 
        type="submit" 
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
      >
        <span v-if="loading">Создание...</span>
        <span v-else>Зарегистрироваться</span>
      </button>
    </form>
    
    <p class="mt-4 text-center text-sm text-gray-600">
      Уже есть аккаунт? 
      <NuxtLink to="/login" class="text-blue-600 hover:underline">Войти</NuxtLink>
    </p>
  </div>
</template>