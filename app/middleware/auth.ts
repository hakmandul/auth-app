// middleware/auth.ts
import { defineNuxtRouteMiddleware, useRequestHeaders, navigateTo } from '#app'
import { authClient } from '~/lib/auth-client' // <-- Импортируй созданный тобой клиент

export default defineNuxtRouteMiddleware(async (to, from) => {
    // 1. Проверяем, есть ли сессия (не делаем запрос, если это статика, но для защиты роута лучше проверить)
    
    // 2. Берем куки. Важно взять только 'cookie', чтобы не передавать лишние заголовки
    const headers = useRequestHeaders(['cookie']);

    // 3. Делаем запрос к Better Auth
    // Функция getSession на клиенте умеет принимать fetchOptions
    const { data: session } = await authClient.getSession({
        fetchOptions: {
            headers: headers as HeadersInit // Прокидываем куки с сервера Nuxt на сервер API
        }
    });

    // 4. Если сессии нет — редирект на логин
    if (!session) {
        // savePosition: false сбрасывает скролл, external: true иногда нужен если логин на другом домене
        return navigateTo('/login') 
    }
})