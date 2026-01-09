import { createAuthClient } from "better-auth/vue"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3001" // URL твоего Hono бэкенда
})

// Экспортируем готовые хуки для удобства
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession 
} = authClient;