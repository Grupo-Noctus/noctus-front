import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken') || '')

  function setAuth(authData: { token: string}) {
    token.value = authData.token

    localStorage.setItem('authToken', authData.token)
  }

  return { token, setAuth }
})
