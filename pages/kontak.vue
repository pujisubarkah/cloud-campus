<script setup>
import { ref, onMounted } from 'vue'

// Set page title
useHead({
  title: 'Kontak Kami - Akademi Pengentasan Kemiskinan',
  meta: [
    { name: 'description', content: 'Hubungi kami untuk pertanyaan, masukan, atau kolaborasi dalam program pengentasan kemiskinan' }
  ]
})

// Form state
const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isVisible = ref(false)

// Form submission
const submitForm = async () => {
  isSubmitting.value = true
  try {
    const res = await fetch('/api/pesan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (res.status === 401) {
      window.location.href = '/login'
      return
    }
    const data = await res.json()
    if (data.success) {
      alert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
      form.value = { name: '', email: '', message: '' }
    } else {
      alert('Gagal mengirim pesan: ' + (data.error || 'Unknown error'))
    }
  } catch (err) {
    alert('Terjadi kesalahan jaringan atau server.')
  }
  isSubmitting.value = false
}

onMounted(() => {
  isVisible.value = true
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      <div class="absolute top-2/3 left-2/3 w-64 h-64 bg-green-300 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 pt-32 pb-20">
      <div class="container mx-auto px-6 lg:px-8">
        
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>Kontak Kami</span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Mari <span class="text-blue-600">Berkolaborasi</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Bergabunglah dengan kami dalam misi mulia mengentaskan kemiskinan di Indonesia. Setiap ide dan dukungan Anda sangat berharga.
          </p>
        </div>

        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-3 gap-12">
            
            <!-- Contact Information -->
            <div class="lg:col-span-1 space-y-8">
              
              <!-- Quick Contact Cards -->
              <div class="space-y-6">
                <!-- Email Card -->
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                  <div class="flex items-center space-x-4">
                    <div class="bg-gradient-to-br from-blue-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 mb-1">Email</h3>
                      <a href="mailto:humas@lan.go.id" class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
                        humas@lan.go.id
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Phone Card -->
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                  <div class="flex items-center space-x-4">
                    <div class="bg-gradient-to-br from-green-500 to-teal-600 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 mb-1">Telepon</h3>
                      <a href="tel:0213455024" class="text-green-600 hover:text-green-700 font-medium transition-colors duration-300">
                        021 3455024 / 021 3455021
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Address Card -->
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                  <div class="flex items-start space-x-4">
                    <div class="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 mb-2">Alamat Kantor</h3>
                      <p class="text-gray-700 leading-relaxed">
                        Lembaga Administrasi Negara<br>
                        Jl. Veteran No. 10<br>
                        Jakarta Pusat 10110
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Office Hours -->
              <div class="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border border-blue-200">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Jam Operasional
                </h3>
                <div class="space-y-2 text-gray-700">
                  <div class="flex justify-between">
                    <span>Senin - Kamis</span>
                    <span class="font-medium">08:00 - 16:00</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Jumat</span>
                    <span class="font-medium">08:00 - 16:30</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Sabtu - Minggu</span>
                    <span class="font-medium text-red-500">Tutup</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Form & Map -->
            <div class="lg:col-span-2 space-y-8">
              
              <!-- Contact Form -->
              <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-10 border border-white/50">
                <div class="text-center mb-8">
                  <h2 class="text-3xl font-bold text-gray-800 mb-4">Kirim Pesan</h2>
                  <p class="text-gray-600">Sampaikan pertanyaan, saran, atau proposal kolaborasi Anda</p>
                </div>

                <form @submit.prevent="submitForm" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                      <input 
                        v-model="form.name"
                        type="text" 
                        required
                        placeholder="Masukkan nama lengkap Anda"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input 
                        v-model="form.email"
                        type="email" 
                        required
                        placeholder="contoh@email.com"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                    <textarea 
                      v-model="form.message"
                      required
                      rows="6"
                      placeholder="Tuliskan pesan, pertanyaan, atau proposal kolaborasi Anda..."
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
                    ></textarea>
                  </div>

                  <div class="flex justify-end">
                    <button 
                      type="submit"
                      :disabled="isSubmitting"
                      class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                      <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}</span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Map Section -->
              <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-2">Lokasi Kami</h2>
                  <p class="text-gray-600">Kunjungi kantor kami di pusat kota Jakarta</p>
                </div>
                
                <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=Lembaga+Administrasi+Negara,+Jl.+Veteran+No.10,+Jakarta&output=embed"
                    width="100%"
                    height="400"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="w-full"
                  ></iframe>
                </div>
                
                <div class="mt-6 text-center">
                  <a 
                    href="https://maps.google.com?q=Lembaga+Administrasi+Negara,+Jl.+Veteran+No.10,+Jakarta" 
                    target="_blank"
                    class="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    <span>Buka di Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Glass morphism effects */
.bg-white\/80 {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
}

/* Enhanced animations */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Smooth transitions */
* {
  transition-property: transform, opacity, background-color, border-color, box-shadow, color;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Button hover effects */
button:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive optimizations */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
</style>