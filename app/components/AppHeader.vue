<script setup lang="ts">
import { signOut, useSession } from '~/lib/auth-client';

const session = useSession(); // Реактивный хук сессии
const router = useRouter();

const handleLogout = async () => {
  await signOut();
  router.push('/login');
};
</script>

<template>
  <header class="border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Логотип -->
      <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        MyApp
      </NuxtLink>

      <!-- Навигация -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Главная</NuxtLink>
        <NuxtLink to="/dashboard" class="hover:text-blue-600 transition-colors">Дашборд</NuxtLink>
      </nav>

      <!-- Правая часть (Auth) -->
      <div class="flex items-center gap-4">
        <!-- Состояние загрузки (скелетон) -->
        <div v-if="session.isPending" class="animate-pulse flex gap-2">
           <div class="h-9 w-20 bg-gray-200 rounded-md"></div>
        </div>

        <!-- Если пользователь авторизован -->
        <div v-else-if="session.data" class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 hidden sm:block">
                {{ session.data.user.name }}
            </span>
            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                {{ session.data.user.name.charAt(0).toUpperCase() }}
            </div>
            <button 
                @click="handleLogout" 
                class="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
            >
                Выйти
            </button>
        </div>

        <!-- Если гость -->
        <div v-else class="flex items-center gap-2">
            <NuxtLink 
                to="/login" 
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
                Войти
            </NuxtLink>
            <NuxtLink 
                to="/register" 
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
                Регистрация
            </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>