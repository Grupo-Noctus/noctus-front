import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const email = ref(localStorage.getItem('authEmail') || '')
  const password = ref(localStorage.getItem('authPassword') || '')

  function setAuth(authData: { email: string, password: string }) {
    email.value = authData.email
    password.value = authData.password

    localStorage.setItem('authEmail', authData.email)
    localStorage.setItem('authPassword', authData.password)
  }

  return { email, password, setAuth }
})
