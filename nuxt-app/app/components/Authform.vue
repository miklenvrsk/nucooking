<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
const { login } = useStrapiAuth()
const nuxtApp = useNuxtApp()
const { getProviderAuthenticationUrl } = useStrapiAuth()
//const { loggedIn, user, fetch: refreshSession } = useUserSession()

const toast = useToast()
const openErroy = ref(false)
const success = ref(false)

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Login with Google' })
    window.location.href = getProviderAuthenticationUrl('google')
  },


}, {
  label: 'VK',
  icon: 'i-simple-icons-vk',
  onClick: () => {
    toast.add({ title: 'VK', description: 'Login with VK' })
  }
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    await login({ identifier: payload.data.email, password: payload.data.password })
    console.log('Submitted', payload)
    success.value = true
    openErroy.value = false
    await nuxtApp.callHook('app:user:auth', payload)


    //router.push('/authenticated-page')
  } catch (e) {
    openErroy.value = true

  }
}


</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        class="auth-form"
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Welcome back!"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account? <ULink to="#" class="text-primary font-medium">Sign up</ULink>.
        </template>
        <template #password-hint>
          <ULink to="#" class="text-primary font-medium" tabindex="-1">Forgot password?</ULink>
        </template>
        <template #validation>
          <div v-if="openErroy">
            <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
          </div>
          <div v-if="success">
            <UAlert color="success" icon="i-lucide-info" title="Signing in" />
          </div>


        </template>
        <template #footer>
          By signing in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of Service</ULink>.
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
<style>
.auth-form button {
  cursor: pointer;
}
</style>


