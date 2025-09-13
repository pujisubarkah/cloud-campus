// stores/auth.ts
import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  full_name: string
  role_id: number
  token: string  // 👈 Token wajib ada
  avatar_seed?: string
  foto_url?: string | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as User | null,
  }),
  
  actions: {
    login(userData: User) {
      // Pastikan token ada
      if (!userData.token) {
        console.error('Token is required for login')
        return
      }
      // Simpan avatar_seed dan foto_url jika ada
      this.user = {
        ...userData,
        avatar_seed: userData.avatar_seed ?? undefined,
        foto_url: userData.foto_url ?? null
      }
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify({
        ...userData,
        avatar_seed: userData.avatar_seed ?? undefined,
        foto_url: userData.foto_url ?? null
      }))
      localStorage.setItem('isLoggedIn', 'true')
      console.log('User logged in with token:', userData.token)
    },
    
    logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
    },
    
    loadFromStorage() {
      if (process.client) {
        const userStr = localStorage.getItem('user')
        const isLoggedInStr = localStorage.getItem('isLoggedIn')
        
        if (userStr && isLoggedInStr === 'true') {
          try {
            const userData = JSON.parse(userStr)
            // Pastikan token ada setelah load dari storage
            if (userData.token) {
              this.user = {
                ...userData,
                avatar_seed: userData.avatar_seed ?? undefined,
                foto_url: userData.foto_url ?? null
              }
              this.isLoggedIn = true
              console.log('User loaded from storage with token:', userData.token)
            } else {
              console.warn('No token found in stored user data')
              this.logout()
            }
          } catch (error) {
            console.error('Error parsing user data:', error)
            this.logout()
          }
        }
      }
    }
  }
})
