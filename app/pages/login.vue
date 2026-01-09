<script setup lang="ts">
// Убедись, что путь к клиенту правильный. 
// В новой структуре Nuxt 4 это может быть '~/utils/auth'
import { signIn } from '~/lib/auth-client'; 

const form = reactive({ email: '', password: '' });
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  const { error } = await signIn.email({
    email: form.email,
    password: form.password,
  });

  if (error) {
    alert(error.message);
    loading.value = false;
  } else {
    router.push('/dashboard');
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Вход в систему</h1>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <!-- ДОБАВЛЕНО: text-gray-900 bg-white -->
        <input 
          v-model="form.email" 
          type="email" 
          required 
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white border-gray-300" 
          placeholder="john@example.com" 
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <!-- ДОБАВЛЕНО: text-gray-900 bg-white -->
        <input 
          v-model="form.password" 
          type="password" 
          required 
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white border-gray-300" 
          placeholder="••••••••" 
        />
      </div>

      <button 
        type="submit" 
        :disabled="loading"
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition-all disabled:opacity-70 flex justify-center"
      >
        <span v-if="loading">Вход...</span>
        <span v-else>Войти</span>
      </button>
    </form>
    
    <p class="mt-4 text-center text-sm text-gray-600">
      Нет аккаунта? 
      <NuxtLink to="/register" class="text-indigo-600 hover:underline">Создать</NuxtLink>
    </p>
  </div>
</template>