// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: number; name: string; role_id: number },
  }),
  persist: true, // 🔥 Ini tetap dipakai!
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    login(user: { id: number; name: string; role_id: number }) {
      this.user = user
    },
    logout() {
      this.user = null
    },
  },
})
