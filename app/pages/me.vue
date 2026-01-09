<script setup lang="ts">
definePageMeta({
  middleware: ['auth'] 
});

// 1. ВАЖНО: Забираем куки из текущего запроса пользователя к Nuxt
const headers = useRequestHeaders(['cookie']);

const { data, status, error, refresh } = await useFetch('http://localhost:3001/api/me', {
  // 2. ВАЖНО: Передаем эти куки в запрос к API (для работы SSR)
  headers: headers as HeadersInit,
  
  // 3. Разрешаем куки для запросов из браузера
  credentials: 'include',
  
  watch: false
});

const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <!-- Твой HTML код остается без изменений -->
  <div class="max-w-4xl mx-auto py-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">API Профиль (/api/me)</h1>
        <p class="text-gray-500 mt-2">
          Данные получены напрямую с защищенного эндпоинта Hono
        </p>
      </div>
      <button 
        @click="refresh()" 
        class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        <span v-if="status === 'pending'" class="animate-spin">🔄</span>
        <span v-else>🔄 Обновить</span>
      </button>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="status === 'pending'" class="space-y-4">
      <div class="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
      <h3 class="font-bold text-lg mb-2">Ошибка доступа</h3>
      <p>{{ error.message }}</p>
      <p class="text-sm mt-2 opacity-75">Проверьте CORS настройки и консоль бэкенда.</p>
    </div>

    <!-- Данные -->
    <div v-else-if="data" class="grid gap-6">
      
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <h2 class="text-2xl font-bold mb-2">Сообщение от сервера:</h2>
        <!-- Используем Optional Chaining (?.) для безопасности -->
        <p class="text-xl opacity-90">"{{ data?.message }}"</p>
      </div>

      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">User Details</h3>
          <span class="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-mono">Authenticated</span>
        </div>
        
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-300">
              {{ data?.user?.name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Имя пользователя</p>
              <p class="text-lg font-medium text-gray-900 dark:text-white">{{ data?.user?.name }}</p>
            </div>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Email адрес</p>
            <p class="text-lg font-medium text-gray-900 dark:text-white break-all">{{ data?.user?.email }}</p>
          </div>

          <div class="md:col-span-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">User ID (UUID)</p>
            <p class="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 text-gray-700 dark:text-gray-300">
              {{ data?.user?.id }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Дата регистрации</p>
            <p class="text-gray-900 dark:text-white">{{ formatDate(data?.user?.createdAt) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Последнее обновление</p>
            <p class="text-gray-900 dark:text-white">{{ formatDate(data?.user?.updatedAt) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-950 rounded-xl p-6 shadow-inner overflow-x-auto">
        <p class="text-gray-400 text-xs uppercase font-bold mb-3 tracking-wider">Raw Server Response</p>
        <pre class="text-xs text-green-400 font-mono leading-relaxed">{{ data }}</pre>
      </div>

    </div>
  </div>
</template>