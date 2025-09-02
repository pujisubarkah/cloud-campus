<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              📚 Kelola Materi Kursus
            </h1>
            <p class="text-gray-600 text-lg">Atur dan kelola section, konten, serta quiz dalam kursus Anda</p>
          </div>
        </div>
      </div>

      <!-- Add Section Form -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Tambah Section Baru
        </h2>
        
        <form class="flex flex-col lg:flex-row gap-4 items-end" @submit.prevent="addSection">
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Section</label>
            <input 
              v-model="newSectionTitle" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="Masukkan judul section..."
              required 
            />
          </div>
          <div class="lg:w-32">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Urutan</label>
            <input 
              v-model.number="newSectionOrder" 
              type="number" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="1"
              min="1" 
              required 
            />
          </div>
          <button 
            type="submit" 
            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Tambah Section
          </button>
        </form>
        
        <div v-if="sectionError" class="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 font-medium">{{ sectionError }}</p>
          </div>
        </div>
      </div>

      <!-- Sections List -->
      <div v-if="sections.length === 0" class="text-center py-16">
        <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-12 max-w-md mx-auto">
          <div class="text-6xl mb-6">📝</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">Belum Ada Section</h3>
          <p class="text-gray-500">Mulai dengan membuat section pertama untuk kursus Anda!</p>
        </div>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="section in sections"
          :key="section.id"
          class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <!-- Section Header -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div class="text-white">
                <div class="flex items-center gap-3 mb-2">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full text-sm font-bold">
                    {{ section.order }}
                  </span>
                  <h3 class="text-xl font-bold">{{ section.title }}</h3>
                </div>
                <p class="text-blue-100">
                  {{ (section.contents?.length || 0) + (section.quizzes?.length || 0) }} item materi
                </p>
              </div>
              <div class="flex gap-3">
                <button 
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-300" 
                  @click="editSection(section)"
                >
                  <Pencil class="w-4 h-4" /> 
                  Edit
                </button>
                <button 
                  class="inline-flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-300" 
                  @click="deleteSection(section.id)"
                >
                  <Trash2 class="w-4 h-4" /> 
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <!-- Section Content -->
          <div class="p-8">
            <!-- Content List -->
            <div v-if="section.contents && section.contents.length" class="mb-8">
              <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                📄 Konten Materi
              </h4>
              <div class="grid gap-4">
                <div 
                  v-for="content in section.contents" 
                  :key="content.id" 
                  class="bg-blue-50/50 rounded-xl p-4 border-l-4 border-blue-500"
                >
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full">
                          {{ content.order }}
                        </span>
                        <a 
                          :href="content.content_url" 
                          target="_blank" 
                          class="text-blue-700 hover:text-blue-900 font-semibold hover:underline"
                        >
                          {{ content.title }}
                        </a>
                        <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-200 rounded-full">
                          {{ content.type }}
                        </span>
                      </div>
                      <p v-if="content.deskripsi" class="text-gray-600 text-sm">{{ content.deskripsi }}</p>
                    </div>
                    <div class="flex gap-2">
                      <button 
                        class="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-medium rounded-lg transition-all duration-300" 
                        @click="openEditContentModal(content)"
                      >
                        Edit
                      </button>
                      <button 
                        class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium rounded-lg transition-all duration-300" 
                        @click="removeContent(content.id)"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quiz List -->
            <div v-if="section.quizzes && section.quizzes.length" class="mb-8">
              <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                ❓ Quiz & Evaluasi
              </h4>
              <div class="grid gap-4">
                <div 
                  v-for="quiz in section.quizzes" 
                  :key="quiz.id" 
                  class="bg-purple-50/50 rounded-xl p-4 border-l-4 border-purple-500"
                >
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full">
                          {{ quiz.order }}
                        </span>
                        <span class="text-purple-700 font-semibold">{{ quiz.question }}</span>
                        <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-800 bg-purple-200 rounded-full">
                          {{ quiz.type }}
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button 
                        class="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-medium rounded-lg transition-all duration-300" 
                        @click="openEditQuizModal(quiz)"
                      >
                        Edit
                      </button>
                      <button 
                        class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium rounded-lg transition-all duration-300" 
                        @click="removeQuiz(quiz.id)"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="(!section.contents || section.contents.length === 0) && (!section.quizzes || section.quizzes.length === 0)" class="text-center py-12">
              <div class="text-4xl mb-4">📝</div>
              <p class="text-gray-500 mb-6">Belum ada konten atau quiz di section ini</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button 
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                @click="openAddContentModal(section)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Konten
              </button>
              <button 
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                @click="openAddQuizModal(section)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Tambah Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Konten -->
    <div v-if="showAddContentModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative transform transition-all duration-300">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="showAddContentModal = false">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📄 Tambah Konten Baru
          </h2>
          <p class="text-gray-600">Tambahkan materi ke section "{{ selectedSection?.title }}"</p>
        </div>

        <form @submit.prevent="addContent" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Judul Konten</label>
            <input 
              v-model="newContentTitle" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="Masukkan judul konten..."
              required 
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Deskripsi Konten</label>
            <textarea 
              v-model="newContentDescription" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 h-32 resize-none" 
              placeholder="Jelaskan tentang konten ini..."
            ></textarea>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Tipe Konten</label>
              <select 
                v-model="newContentType" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="video">📹 Video</option>
                <option value="pdf">📄 PDF</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Urutan Konten</label>
              <input 
                v-model.number="newContentOrder" 
                type="number" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                min="1" 
                placeholder="1"
                required 
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">URL Konten</label>
            <input 
              v-model="newContentUrl" 
              type="url" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="https://example.com/content"
              required 
            />
          </div>
          
          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="showAddContentModal = false"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Simpan Konten
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Tambah Quiz -->
    <div v-if="showAddQuizModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="showAddQuizModal = false">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            ❓ Tambah Quiz Baru
          </h2>
          <p class="text-gray-600">Tambahkan quiz ke section "{{ selectedSection?.title }}"</p>
        </div>

        <form @submit.prevent="addQuiz" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Tipe Quiz</label>
              <select 
                v-model="newQuizType" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="multiple">📋 Multiple Choice</option>
                <option value="short">✏️ Short Answer</option>
                <option value="truefalse">✅ True or False</option>
                <option value="fill">📝 Fill in the Blanks</option>
                <option value="likert">📊 Likert Scale</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Urutan Quiz</label>
              <input 
                v-model.number="newQuizOrder" 
                type="number" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                min="1" 
                placeholder="1"
                required 
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Pertanyaan Quiz</label>
            <input 
              v-model="newQuizQuestion" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
              placeholder="Masukkan pertanyaan quiz..."
              required 
            />
          </div>
          
          <!-- Multiple Choice Options -->
          <div v-if="newQuizType === 'multiple'" class="space-y-4">
            <label class="block text-sm font-semibold text-gray-700">Pilihan Jawaban</label>
            <div v-for="(choice, idx) in newQuizChoices" :key="idx" class="flex gap-3 items-center">
              <input 
                v-model="newQuizChoices[idx]" 
                type="text" 
                class="flex-1 px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                :placeholder="`Pilihan ${String.fromCharCode(65+idx)}`"
                required 
              />
              <label class="flex items-center gap-2 text-sm">
                <input type="radio" :value="idx" v-model="newQuizCorrect" class="text-purple-600" />
                <span class="text-gray-600">Jawaban Benar</span>
              </label>
            </div>
            <button 
              type="button" 
              class="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg transition-all duration-300" 
              @click="addChoice"
            >
              + Tambah Pilihan
            </button>
          </div>
          
          <!-- Short Answer -->
          <div v-if="newQuizType === 'short'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Jawaban Singkat</label>
            <input 
              v-model="newQuizAnswer" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
              placeholder="Jawaban yang diharapkan..."
              required 
            />
          </div>
          
          <!-- True or False -->
          <div v-if="newQuizType === 'truefalse'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Jawaban</label>
            <select 
              v-model="newQuizAnswer" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option value="true">✅ True</option>
              <option value="false">❌ False</option>
            </select>
          </div>
          
          <!-- Fill in the Blanks -->
          <div v-if="newQuizType === 'fill'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Jawaban yang Benar</label>
            <input 
              v-model="newQuizAnswer" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
              placeholder="Jawaban untuk mengisi titik-titik..."
              required 
            />
          </div>
          
          <!-- Likert Scale -->
          <div v-if="newQuizType === 'likert'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Skala Likert (1-5)</label>
            <select 
              v-model="newQuizAnswer" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ ['Sangat Tidak Setuju', 'Tidak Setuju', 'Netral', 'Setuju', 'Sangat Setuju'][n-1] }}</option>
            </select>
          </div>
          
          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="showAddQuizModal = false"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Simpan Quiz
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Section -->
    <div v-if="showEditSectionModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-lg relative transform transition-all duration-300">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="showEditSectionModal = false">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ✏️ Edit Section
          </h2>
          <p class="text-gray-600">Perbarui informasi section</p>
        </div>

        <form @submit.prevent="saveEditSection" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Judul Section</label>
            <input 
              v-model="editSectionTitle" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="Masukkan judul section..."
              required 
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Urutan</label>
            <input 
              v-model.number="editSectionOrder" 
              type="number" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              min="1" 
              placeholder="1"
              required 
            />
          </div>
          
          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="showEditSectionModal = false"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Content -->
    <div v-if="showEditContentModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative transform transition-all duration-300">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="showEditContentModal = false">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📝 Edit Konten
          </h2>
          <p class="text-gray-600">Perbarui informasi konten</p>
        </div>

        <form @submit.prevent="saveEditContent" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Judul Konten</label>
            <input 
              v-model="editContentTitle" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="Masukkan judul konten..."
              required 
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Deskripsi Konten</label>
            <textarea 
              v-model="editContentDescription" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 h-32 resize-none" 
              placeholder="Jelaskan tentang konten ini..."
            ></textarea>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Tipe Konten</label>
              <select 
                v-model="editContentType" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="video">📹 Video</option>
                <option value="pdf">📄 PDF</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Urutan Konten</label>
              <input 
                v-model.number="editContentOrder" 
                type="number" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                min="1" 
                placeholder="1"
                required 
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">URL Konten</label>
            <input 
              v-model="editContentUrl" 
              type="url" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="https://example.com/content"
              required 
            />
          </div>
          
          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="showEditContentModal = false"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Update Konten
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Quiz -->
    <div v-if="showEditQuizModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="showEditQuizModal = false">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            ✏️ Edit Quiz
          </h2>
          <p class="text-gray-600">Perbarui informasi quiz</p>
        </div>

        <form @submit.prevent="saveEditQuiz" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Tipe Quiz</label>
              <select 
                v-model="editQuizType" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="multiple">📋 Multiple Choice</option>
                <option value="short">✏️ Short Answer</option>
                <option value="truefalse">✅ True or False</option>
                <option value="fill">📝 Fill in the Blanks</option>
                <option value="likert">📊 Likert Scale</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Urutan Quiz</label>
              <input 
                v-model.number="editQuizOrder" 
                type="number" 
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                min="1" 
                placeholder="1"
                required 
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Pertanyaan Quiz</label>
            <input 
              v-model="editQuizQuestion" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
              placeholder="Masukkan pertanyaan quiz..."
              required 
            />
          </div>
          
          <!-- Multiple Choice Options -->
          <div v-if="editQuizType === 'multiple'" class="space-y-4">
            <label class="block text-sm font-semibold text-gray-700">Pilihan Jawaban</label>
            <div v-for="(choice, idx) in editQuizChoices" :key="idx" class="flex gap-3 items-center">
              <input 
                v-model="editQuizChoices[idx]" 
                type="text" 
                class="flex-1 px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                :placeholder="`Pilihan ${String.fromCharCode(65+idx)}`"
                required 
              />
              <label class="flex items-center gap-2 text-sm">
                <input type="radio" :value="idx" v-model="editQuizCorrect" class="text-purple-600" />
                <span class="text-gray-600">Jawaban Benar</span>
              </label>
            </div>
            <button 
              type="button" 
              class="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg transition-all duration-300" 
              @click="addEditChoice"
            >
              + Tambah Pilihan
            </button>
          </div>
          
          <!-- Short Answer -->
          <div v-if="editQuizType === 'short'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Jawaban Singkat</label>
            <input 
              v-model="editQuizAnswer" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
              placeholder="Jawaban yang diharapkan..."
              required 
            />
          </div>
          
          <!-- True or False -->
          <div v-if="editQuizType === 'truefalse'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Jawaban</label>
            <select 
              v-model="editQuizAnswer" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option value="true">✅ True</option>
              <option value="false">❌ False</option>
            </select>
          </div>
          
          <!-- Fill in the Blanks -->
          <div v-if="editQuizType === 'fill'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Jawaban yang Benar</label>
            <input 
              v-model="editQuizAnswer" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
              placeholder="Jawaban untuk mengisi titik-titik..."
              required 
            />
          </div>
          
          <!-- Likert Scale -->
          <div v-if="editQuizType === 'likert'">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Skala Likert (1-5)</label>
            <select 
              v-model="editQuizAnswer" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ ['Sangat Tidak Setuju', 'Tidak Setuju', 'Netral', 'Setuju', 'Sangat Setuju'][n-1] }}</option>
            </select>
          </div>
          
          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="showEditQuizModal = false"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Update Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Pencil, Trash2 } from 'lucide-vue-next'

const route = useRoute()
const courseId = route.params.id
const sections = ref([])
const newSectionTitle = ref('')
const newSectionOrder = ref(1)
const sectionError = ref('')
const showAddContentModal = ref(false)
const showAddQuizModal = ref(false)
const showEditSectionModal = ref(false)
const selectedSection = ref(null)
const newContentTitle = ref('')
const newContentDescription = ref('')
const newContentUrl = ref('')
const newContentType = ref('video') // Tambahkan ini
const newQuizType = ref('multiple')
const newQuizQuestion = ref('')
const newQuizChoices = ref(['', ''])
const newQuizCorrect = ref(0)
const newQuizAnswer = ref('')
const editSectionTitle = ref('')
const editSectionOrder = ref(1)
const newContentOrder = ref(1) // Tambahkan ini
const sectionContents = ref([])
const newQuizOrder = ref(1) // Tambahkan ini

// Tambahkan variabel untuk edit
const showEditContentModal = ref(false)
const showEditQuizModal = ref(false)
const selectedContent = ref(null)
const selectedQuiz = ref(null)
const editContentTitle = ref('')
const editContentDescription = ref('')
const editContentUrl = ref('')
const editContentType = ref('video')
const editContentOrder = ref(1)
const editQuizType = ref('multiple')
const editQuizQuestion = ref('')
const editQuizChoices = ref(['', ''])
const editQuizCorrect = ref(0)
const editQuizAnswer = ref('')
const editQuizOrder = ref(1)

async function fetchSections() {
  try {
    console.log('=== FETCHING SECTIONS ===')
    console.log('Course ID:', courseId)
    
    // Gunakan endpoint yang sudah ada dengan parameter course_id
    const res = await $fetch('/api/course_section', { 
      method: 'GET',
      params: { course_id: courseId }
    })
    
    console.log('API Response:', res)
    
    let sectionsData = []
    
    if (Array.isArray(res)) {
      sectionsData = res
    } else if (res.sections && Array.isArray(res.sections)) {
      sectionsData = res.sections
    }
    
    console.log('Parsed sections data:', sectionsData)
    
    // Fetch contents dan quiz untuk setiap section
    for (let section of sectionsData) {
      // Fetch contents menggunakan API content_section
      try {
        const contentsRes = await $fetch('/api/content_section', {
          method: 'GET',
          params: { section_id: section.id }
        })
        
        if (Array.isArray(contentsRes)) {
          section.contents = contentsRes
        } else if (contentsRes.contents && Array.isArray(contentsRes.contents)) {
          section.contents = contentsRes.contents
        } else {
          section.contents = []
        }
        
        console.log(`Contents for section ${section.title}:`, section.contents.length)
      } catch (err) {
        console.error(`Error fetching contents for section ${section.id}:`, err)
        section.contents = []
      }
      
      // Fetch quiz
      try {
        const quizRes = await $fetch(`/api/quizzes_section/${section.id}`)
        
        if (Array.isArray(quizRes)) {
          section.quizzes = quizRes
        } else if (quizRes.quizzes && Array.isArray(quizRes.quizzes)) {
          section.quizzes = quizRes.quizzes
        } else {
          section.quizzes = []
        }
        
        console.log(`Quiz for section ${section.title}:`, section.quizzes.length)
      } catch (err) {
        console.error(`Error fetching quiz for section ${section.id}:`, err)
        section.quizzes = []
      }
    }
    
    sections.value = sectionsData.sort((a, b) => a.order - b.order)
    console.log('Final sections:', sections.value)
    
  } catch (error) {
    console.error('Error fetching sections:', error)
    sectionError.value = 'Gagal memuat sections: ' + (error.message || error)
  }
}

async function addSection() {
  sectionError.value = ''
  try {
    const res = await $fetch(`/api/course_section/${courseId}`, {
      method: 'POST',
      body: {
        title: newSectionTitle.value,
        order: newSectionOrder.value
      }
    })
    if (res && res.id) {
      sections.value.push(res)
      newSectionTitle.value = ''
      newSectionOrder.value = sections.value.length + 1
      fetchSections()
    } else {
      sectionError.value = res.error || 'Gagal menambah section.'
    }
  } catch (err) {
    sectionError.value = 'Terjadi kesalahan server.'
  }
}

function editSection(section) {
  selectedSection.value = section
  editSectionTitle.value = section.title
  editSectionOrder.value = section.order
  showEditSectionModal.value = true
}

async function saveEditSection() {
  if (!selectedSection.value) return
  await $fetch(`/api/course_section/${courseId}`, {
    method: 'PUT',
    body: {
      id: selectedSection.value.id,
      title: editSectionTitle.value,
      order: editSectionOrder.value
    }
  })
  showEditSectionModal.value = false
  fetchSections()
}

function deleteSection(id) {
  if (confirm('Yakin ingin menghapus section ini?')) {
    $fetch(`/api/course_section/${courseId}`, {
      method: 'DELETE',
      body: { id }
    }).then(fetchSections)
  }
}

function openAddContentModal(section) {
  selectedSection.value = section
  showAddContentModal.value = true
  newContentTitle.value = ''
  newContentDescription.value = ''
  newContentUrl.value = ''
  newContentType.value = 'video'
  newContentOrder.value = (section.contents?.length || 0) + 1 // default urutan berikutnya
}

async function addContent() {
  try {
    console.log('=== ADDING CONTENT ===')
    console.log('Selected Section:', selectedSection.value.id)
    console.log('Content Data:', {
      title: newContentTitle.value,
      type: newContentType.value,
      deskripsi: newContentDescription.value,
      content_url: newContentUrl.value,
      order: newContentOrder.value
    })

    // Gunakan API /api/content_section yang sudah dibuat
    const res = await $fetch('/api/content_section', {
      method: 'POST',
      body: {
        section_id: selectedSection.value.id,
        title: newContentTitle.value,
        type: newContentType.value,
        deskripsi: newContentDescription.value,
        content_url: newContentUrl.value,
        order: newContentOrder.value
      }
    })

    console.log('API Response:', res)

    if (res.success || res.id) {
      showAddContentModal.value = false
      await fetchSections() // Refresh data
      alert('Konten berhasil ditambahkan!')
    } else {
      alert('Gagal menambahkan konten: ' + (res.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error adding content:', err)
    alert('Gagal menambahkan konten: ' + (err.message || err))
  }
}

async function removeContent(contentId) {
  if (confirm('Yakin ingin menghapus konten ini?')) {
    try {
      console.log('Deleting content:', contentId)
      
      // Gunakan API DELETE content_section dengan ID
      await $fetch(`/api/content_section/${contentId}`, { 
        method: 'DELETE' 
      })
      
      await fetchSections() // Refresh sections
      alert('Konten berhasil dihapus!')
    } catch (err) {
      console.error('Error removing content:', err)
      alert('Gagal menghapus konten!')
    }
  }
}

function addChoice() {
  newQuizChoices.value.push('')
}

function openAddQuizModal(section) {
  selectedSection.value = section
  showAddQuizModal.value = true
  newQuizType.value = 'multiple'
  newQuizQuestion.value = ''
  newQuizChoices.value = ['', '']
  newQuizCorrect.value = 0
  newQuizAnswer.value = ''
  newQuizOrder.value = (section.quizzes?.length || 0) + 1 // default urutan berikutnya
}

async function addQuiz() {
  try {
    let body = { 
      type: newQuizType.value, 
      question: newQuizQuestion.value,
      section_id: selectedSection.value.id,
      order: newQuizOrder.value // Kirim order ke API
    }
    if (newQuizType.value === 'multiple') {
      body.choices = newQuizChoices.value
      body.correct_answer = newQuizCorrect.value
    } else {
      body.correct_answer = newQuizAnswer.value
    }
    const res = await $fetch(`/api/quizzes_section/${selectedSection.value.id}`, {
      method: 'POST',
      body
    })
    if (res.error) {
      alert('Gagal menambahkan quiz: ' + res.error)
    } else {
      showAddQuizModal.value = false
      fetchSections()
      alert('Quiz berhasil ditambahkan!')
    }
  } catch (err) {
    alert('Terjadi kesalahan saat menambahkan quiz!')
  }
}

async function fetchSectionContents(sectionId) {
  const res = await $fetch(`/api/content_section/${sectionId}`)
  sectionContents.value = res
}

// Panggil fungsi ini saat section dipilih atau setelah tambah konten
// Contoh: fetchSectionContents(selectedSection.value.id)

onMounted(fetchSections)

// Function untuk open edit content modal
function openEditContentModal(content) {
  selectedContent.value = content
  editContentTitle.value = content.title
  editContentDescription.value = content.deskripsi || ''
  editContentUrl.value = content.content_url
  editContentType.value = content.type
  editContentOrder.value = content.order
  showEditContentModal.value = true
}

// Function untuk save edit content
async function saveEditContent() {
  try {
    console.log('=== UPDATING CONTENT ===')
    console.log('Content ID:', selectedContent.value.id)
    
    const res = await $fetch(`/api/content_section/${selectedContent.value.id}`, {
      method: 'PUT',
      body: {
        title: editContentTitle.value,
        type: editContentType.value,
        deskripsi: editContentDescription.value,
        content_url: editContentUrl.value,
        order: editContentOrder.value
      }
    })

    if (res.success || res.id) {
      showEditContentModal.value = false
      await fetchSections() // Refresh data
      alert('Konten berhasil diupdate!')
    } else {
      alert('Gagal mengupdate konten: ' + (res.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error updating content:', err)
    alert('Gagal mengupdate konten: ' + (err.message || err))
  }
}

// Function untuk open edit quiz modal
function openEditQuizModal(quiz) {
  selectedQuiz.value = quiz
  editQuizType.value = quiz.type
  editQuizQuestion.value = quiz.question
  editQuizOrder.value = quiz.order
  
  if (quiz.type === 'multiple') {
    editQuizChoices.value = Array.isArray(quiz.choices) ? [...quiz.choices] : ['', '']
    editQuizCorrect.value = quiz.correct_answer || 0
  } else {
    editQuizAnswer.value = quiz.correct_answer || ''
  }
  
  showEditQuizModal.value = true
}

// Function untuk save edit quiz - gunakan endpoint quizzes_section
async function saveEditQuiz() {
  try {
    console.log('=== UPDATING QUIZ ===')
    console.log('Quiz ID:', selectedQuiz.value.id)
    
    let body = {
      quiz_id: selectedQuiz.value.id, // tambahkan quiz_id
      type: editQuizType.value,
      question: editQuizQuestion.value,
      order: editQuizOrder.value
    }
    
    if (editQuizType.value === 'multiple') {
      body.choices = editQuizChoices.value
      body.correct_answer = editQuizCorrect.value
    } else {
      body.correct_answer = editQuizAnswer.value
    }

    // Gunakan endpoint quizzes_section dengan method PUT
    const res = await $fetch(`/api/quizzes_section/${selectedQuiz.value.section_id || selectedSection.value.id}`, {
      method: 'PUT',
      body
    })

    if (res.success || res.id) {
      showEditQuizModal.value = false
      await fetchSections() // Refresh data
      alert('Quiz berhasil diupdate!')
    } else {
      alert('Gagal mengupdate quiz: ' + (res.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error updating quiz:', err)
    alert('Gagal mengupdate quiz: ' + (err.message || err))
  }
}

// Function untuk remove quiz - gunakan endpoint quizzes_section
async function removeQuiz(quizId) {
  if (confirm('Yakin ingin menghapus quiz ini?')) {
    try {
      console.log('Deleting quiz:', quizId)
      
      // Cari section_id dari quiz ini
      let sectionId = null
      for (const section of sections.value) {
        if (section.quizzes && section.quizzes.find(q => q.id === quizId)) {
          sectionId = section.id
          break
        }
      }
      
      if (!sectionId) {
        alert('Gagal menghapus quiz: Section tidak ditemukan')
        return
      }
      
      await $fetch(`/api/quizzes_section/${sectionId}`, { 
        method: 'DELETE',
        body: { quiz_id: quizId }
      })
      
      await fetchSections() // Refresh sections
      alert('Quiz berhasil dihapus!')
    } catch (err) {
      console.error('Error removing quiz:', err)
      alert('Gagal menghapus quiz!')
    }
  }
}
</script>
