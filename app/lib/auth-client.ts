import { createAuthClient } from "better-auth/vue"

// ОПРЕДЕЛЯЕМ БАЗОВЫЙ URL
// import.meta.env.SSR — возвращает true, если код выполняется на сервере (Nuxt SSR)
const baseURL = import.meta.env.SSR
    ? "http://127.0.0.1:3001/api/auth" // SSR (сервер): стучимся локально и быстро
    : "/api/auth";                     // Client (браузер): стучимся через Nginx (относительно)

export const authClient = createAuthClient({
    baseURL
})

export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession 
} = authClient;