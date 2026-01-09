<script setup lang="ts">
import { useSession } from '~/lib/auth-client';

definePageMeta({
  middleware: ['auth'] // Подключаем защиту
});

const session = useSession();
</script>

<template>
  <div class="space-y-6">
    <!-- Приветственный блок -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        Добро пожаловать, {{ session.data?.user.name }}! 👋
      </h2>
      <p class="text-gray-600">Это ваша защищенная панель управления.</p>
    </div>

    <!-- Карточка с деталями сессии -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Мои данные</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex justify-between">
            <span class="text-gray-500">ID:</span>
            <span class="font-mono text-gray-800">{{ session.data?.user.id }}</span>
          </li>
          <li class="flex justify-between">
            <span class="text-gray-500">Email:</span>
            <span class="text-gray-800">{{ session.data?.user.email }}</span>
          </li>
          <li class="flex justify-between">
            <span class="text-gray-500">Подтвержден:</span>
            <span :class="session.data?.user.emailVerified ? 'text-green-600' : 'text-amber-600'">
              {{ session.data?.user.emailVerified ? 'Да' : 'Нет' }}
            </span>
          </li>
        </ul>
      </div>

      <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center justify-center">
        <div class="text-center">
          <p class="text-blue-800 font-medium mb-2">Статус сессии</p>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Активна
          </span>
          <p class="mt-4 text-xs text-blue-600/70">Токен сессии действителен</p>
        </div>
      </div>
    </div>
  </div>
</template>