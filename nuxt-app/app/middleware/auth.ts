// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useStrapiUser()

  // Если пользователь НЕ авторизован, перенаправляем его на страницу логина
  if (!user.value) {
    return navigateTo('/login')
  }
})
