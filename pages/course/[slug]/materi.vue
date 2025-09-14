<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
    <!-- Sidebar Materi dengan Design Modern -->
    <transition name="slide">
  <aside v-if="showSidebar" class="w-80 bg-white/95 backdrop-blur-md shadow-2xl border-r border-slate-200 flex flex-col min-h-screen relative mt-10">
        <!-- Header Sidebar -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-br-3xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl tracking-wide flex items-center gap-3">
              <div class="bg-white/20 p-2 rounded-xl">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                </svg>
              </div>
              Daftar Materi
            </h2>
            <button class="btn btn-sm btn-circle bg-white/20 border-none hover:bg-white/30 text-white" @click="toggleSidebar">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="text-sm opacity-90">{{ sections.length }} Section Available</div>
        </div>

        <!-- Progress Overview -->
        <div class="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-slate-600">Progress Keseluruhan</span>
            <span class="text-sm font-bold text-emerald-600">
              {{ progressPercent }}%
            </span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden group relative">
            <div 
              class="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-700 ease-in-out animate-progress"
              :style="`width: ${progressPercent}%`"
            ></div>
            <div v-if="progressPercent > 0" class="absolute left-0 top-0 h-3 flex items-center" :style="`left: calc(${progressPercent}% - 16px)`">
              <div class="w-6 h-6 bg-white border border-emerald-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span class="text-xs font-bold text-emerald-600">{{ progressPercent }}%</span>
              </div>
            </div>
            <div v-if="progressPercent < 100" class="absolute right-0 top-0 h-3 flex items-center group-hover:block">
              <span class="text-xs text-slate-500 bg-white px-2 py-1 rounded shadow">Selesaikan semua section untuk 100%</span>
            </div>
          </div>
          <div class="flex justify-between text-xs text-slate-500 mt-2">
            <span>{{ totalCompletedSet.size }} selesai</span>
            <span>{{ sections.length - totalCompletedSet.size }} tersisa</span>
          </div>
        </div>

        <!-- Daftar Section -->
        <div class="flex-1 p-4 overflow-y-auto">
          <div class="space-y-3">
            <div v-for="(section, index) in sections" :key="section.id" class="group">
              <button
                @click="handleSectionClick(section, index)"
                :disabled="index > 0 && !completedSections.includes(sections[index - 1].id)"
                :class="{
                  'w-full text-left p-4 rounded-xl transition-all duration-300 border-2 relative overflow-hidden': true,
                  'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-lg transform scale-105': selectedSection?.id === section.id,
                  'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-md text-slate-700': selectedSection?.id !== section.id,
                  'ring-2 ring-emerald-200 border-emerald-300': completedSections.includes(section.id),
                  'ring-2 ring-blue-200 border-blue-300': sectionCompletionStatus[section.id] && !completedSections.includes(section.id),
                  'opacity-50 cursor-not-allowed': index > 0 && !completedSections.includes(sections[index - 1].id)
                }"
              >
                <!-- Section Number -->
                <div class="flex items-start gap-4">
                  <div :class="{
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold': true,
                    'bg-white/20 text-white': selectedSection?.id === section.id,
                    'bg-slate-100 text-slate-600': selectedSection?.id !== section.id && !completedSections.includes(section.id),
                    'bg-emerald-100 text-emerald-600': completedSections.includes(section.id)
                  }">
                    <span v-if="!completedSections.includes(section.id)">{{ index + 1 }}</span>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-sm mb-1 line-clamp-2">{{ section.title }}</h3>
                    <div class="flex items-center gap-2 text-xs opacity-75">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ section.contents?.length || 0 }} konten</span>
                    </div>
                  </div>

                  <!-- Status Badge -->
                  <div v-if="completedSections.includes(section.id) || sectionCompletionStatus[section.id]" class="flex-shrink-0">
                    <div :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-emerald-100 text-emerald-600': completedSections.includes(section.id),
                      'bg-blue-100 text-blue-600': sectionCompletionStatus[section.id] && !completedSections.includes(section.id)
                    }">
                      <span v-if="completedSections.includes(section.id)">✅ Selesai</span>
                      <span v-else>🎯 Quiz Selesai</span>
                    </div>
                  </div>
                </div>

                <!-- Hover Effect -->
                <div v-if="selectedSection?.id !== section.id" class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-xl"></div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </transition>

    <!-- Area Konten Utama -->
    <main :class="showSidebar ? 'w-full md:w-[calc(100%-20rem)]' : 'w-full'" class="flex-1 transition-all duration-300">
      <!-- Skor Total Course -->
  <div v-if="sections.length > 0" class="mb-6 max-w-4xl mx-auto mt-10">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow">
          <div>
            <h2 class="text-xl font-bold text-blue-700 mb-2">Skor Total Course</h2>
            <div class="text-lg text-blue-800 font-semibold">{{ userCourseQuizPoints }} / {{ totalCourseQuizPoints }}</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-2xl font-bold text-emerald-600">{{ Math.round(courseScorePercent) }}</span>
          </div>
        </div>
      </div>
      <!-- Header Konten -->
      <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 sticky top-16 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button v-if="!showSidebar" class="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white border-none shadow-lg" @click="toggleSidebar">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div class="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                {{ selectedSection?.title || 'Pilih materi di sidebar' }}
              </h1>
              <p v-if="selectedSection" class="text-sm text-slate-500 mt-1">
                Section {{ sections.findIndex(s => s.id === selectedSection.id) + 1 }} dari {{ sections.length }}
              </p>
            </div>
          </div>

          <!-- Action Button -->
          <div v-if="selectedSection" class="flex items-center gap-3">
            <button
              v-if="!completedSections.includes(selectedSection.id)"
              class="btn bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-none shadow-lg px-6"
              @click="handleCompletion(selectedSection.id)"
            >
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Tandai Selesai
            </button>
            <div v-else class="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-200">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="font-medium">Section Selesai</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Konten Section -->
      <div class="p-6">
        <div v-if="selectedSection" class="max-w-4xl mx-auto">
          <div v-if="selectedSection.contents && selectedSection.contents.length" class="space-y-8">
            <div
              v-for="(content, index) in selectedSection.contents"
              :key="content.id"
              class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <!-- Content Header -->
              <div class="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
                <div class="flex items-center gap-4 mb-3">
                  <div class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {{ content.order }}
                  </div>
                  <h3 class="text-xl font-bold text-slate-800">{{ content.title }}</h3>
                  <div class="ml-auto">
                    <span :class="{
                      'px-3 py-1 rounded-full text-xs font-medium': true,
                      'bg-red-100 text-red-600': content.type === 'video',
                      'bg-orange-100 text-orange-600': content.type === 'pdf',
                      'bg-purple-100 text-purple-600': content.type === 'link'
                    }">
                      {{ content.type.toUpperCase() }}
                    </span>
                  </div>
                </div>
                <p v-if="content.deskripsi" class="text-slate-600 leading-relaxed whitespace-pre-line">{{ content.deskripsi }}</p>
              </div>

              <!-- Content Body -->
              <div class="p-6">
                <!-- Video Content -->
                <div v-if="content.type === 'video'" class="space-y-4">
                  <div class="relative overflow-hidden rounded-xl shadow-lg">
                    <div class="relative w-full" style="padding-top: 56.25%;">
                      <iframe
                        :src="getYoutubeEmbed(content.content_url)"
                        frameborder="0"
                        allowfullscreen
                        class="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-slate-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    <span>Video pembelajaran interaktif</span>
                  </div>
                </div>

                <!-- PDF Content -->
                <div v-else-if="content.type === 'pdf'" class="space-y-4">
                  <div class="bg-slate-50 rounded-xl overflow-hidden">
                    <iframe
                      :src="content.content_url"
                      class="w-full h-96 border-none"
                    ></iframe>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2 text-slate-500">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 1H7a2 2 0 00-2 2v16a2 2 0 002 2z"/>
                      </svg>
                      <span>Dokumen PDF</span>
                    </div>
                    <a :href="content.content_url" target="_blank" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      <span>Buka di tab baru</span>
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Other Content Types -->
                <div v-else class="text-center py-8">
                  <div class="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <a :href="content.content_url" target="_blank" class="btn bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none shadow-lg">
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Akses Konten
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Tampilkan Quiz jika ada -->
          <div v-if="selectedSection && selectedSection.quizzes && selectedSection.quizzes.length" class="space-y-8 mt-8">
            <div v-for="quiz in selectedSection.quizzes" 
                 :key="quiz.id" 
                 :data-quiz-id="quiz.id"
                 class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 transition-all duration-300">
              
              <!-- Quiz header -->
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ quiz.order }}
                </div>
                <div class="flex items-center justify-between mb-4 flex-1">
                  <h3 class="text-lg font-bold text-slate-800">{{ quiz.question }}</h3>
                  <div class="flex items-center gap-2">
                    <!-- Status Quiz Icon Only -->
                    <span v-if="quizScores[quiz.id] !== undefined"
                          class="px-2 py-1 rounded-full flex items-center justify-center"
                          :class="{
                            'bg-emerald-100': quizScores[quiz.id] > 0,
                            'bg-red-100': quizScores[quiz.id] === 0
                          }">
                      <template v-if="quizScores[quiz.id] > 0">
                        <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7"/></svg>
                      </template>
                      <template v-else>
                        <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </template>
                    </span>
                    <!-- Quiz counter -->
                    <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      Quiz {{ selectedSection.quizzes.findIndex(q => q.id === quiz.id) + 1 }} / {{ selectedSection.quizzes.length }}
                    </span>
                    <!-- Type Badge -->
                    <span class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-purple-100 text-purple-600': quiz.type === 'multiple',
                        'bg-blue-100 text-blue-600': quiz.type === 'short',
                        'bg-green-100 text-green-600': quiz.type === 'truefalse',
                        'bg-orange-100 text-orange-600': quiz.type === 'fill',
                        'bg-emerald-100 text-emerald-600': quiz.type === 'likert'
                      }">
                      {{ quiz.type.toUpperCase() }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Multiple Choice -->
              <div v-if="quiz.type === 'multiple'" class="mt-4 space-y-3">
                <div v-for="(choice, idx) in quiz.choices" :key="idx" 
                     class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 cursor-pointer"
                     :class="{ 'border-purple-500 bg-purple-50': quizAnswers[quiz.id] === idx }"
                     @click="saveQuizAnswer(quiz.id, idx)">
                  <input 
                    type="radio" 
                    :name="'quiz-' + quiz.id" 
                    :value="idx" 
                    v-model="quizAnswers[quiz.id]"
                    class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                  />
                  <span class="text-slate-700 font-medium">{{ String.fromCharCode(65 + idx) }}.</span>
                  <span class="text-slate-800">{{ choice }}</span>
                </div>
              </div>

              <!-- Short Answer -->
              <div v-else-if="quiz.type === 'short'" class="mt-4">
                <input 
                  type="text" 
                  v-model="quizAnswers[quiz.id]"
                  class="input input-bordered w-full p-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                  placeholder="Masukkan jawaban singkat..."
                />
              </div>

              <!-- True or False -->
              <div v-else-if="quiz.type === 'truefalse'" class="mt-4 flex gap-6">
                <label class="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                       :class="{ 'border-green-500 bg-green-50': quizAnswers[quiz.id] === 'true' }">
                  <input 
                    type="radio" 
                    :name="'quiz-' + quiz.id" 
                    value="true" 
                    v-model="quizAnswers[quiz.id]"
                    class="w-4 h-4 text-green-600"
                  />
                  <span class="font-medium text-green-700">Benar</span>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                       :class="{ 'border-red-500 bg-red-50': quizAnswers[quiz.id] === 'false' }">
                  <input 
                    type="radio" 
                    :name="'quiz-' + quiz.id" 
                    value="false" 
                    v-model="quizAnswers[quiz.id]"
                    class="w-4 h-4 text-red-600"
                  />
                  <span class="font-medium text-red-700">Salah</span>
                </label>
              </div>

              <!-- Fill in the Blanks -->
              <div v-else-if="quiz.type === 'fill'" class="mt-4">
                <input 
                  type="text" 
                  v-model="quizAnswers[quiz.id]"
                  class="input input-bordered w-full p-3 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                  placeholder="Isi jawaban yang tepat..."
                />
              </div>

              <!-- Likert Scale -->
              <div v-else-if="quiz.type === 'likert'" class="mt-4">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm text-slate-500">Sangat Tidak Setuju</span>
                  <span class="text-sm text-slate-500">Sangat Setuju</span>
                </div>
                <div class="flex gap-4 justify-center">
                  <label v-for="n in 5" :key="n" 
                         class="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                         :class="{ 'border-emerald-500 bg-emerald-50': quizAnswers[quiz.id] === n }">
                    <input 
                      type="radio" 
                      :name="'quiz-' + quiz.id" 
                      :value="n" 
                      v-model="quizAnswers[quiz.id]"
                      class="w-4 h-4 text-emerald-600"
                    />
                    <span class="font-bold text-emerald-700">{{ n }}</span>
                  </label>
                </div>
              </div>

              <!-- Skor Quiz -->
              <div v-if="quizScores[quiz.id] !== undefined" class="mt-4 text-emerald-700 font-semibold">
                Skor Anda: {{ quizScores[quiz.id] }}
              </div>

              <!-- Submit Button -->
              <div class="mt-6 flex justify-end">
                <button 
                  @click="submitQuiz(quiz)"
                  class="btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-none shadow-lg px-6"
                  :disabled="!quizAnswers[quiz.id] && quizAnswers[quiz.id] !== 0"
                  :class="{ 'opacity-50 cursor-not-allowed': !quizAnswers[quiz.id] && quizAnswers[quiz.id] !== 0 }"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Submit Jawaban
                </button>
              </div>

              <!-- Submit Button -->
            <!-- Tombol Submit Semua Jawaban -->
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 max-w-md mx-auto">
          <div class="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-700 mb-3">Pilih Materi atau Quiz</h3>
          <p class="text-slate-500 mb-6">
            Silakan pilih section dari sidebar untuk mulai belajar atau mengerjakan quiz.
          </p>
          <button v-if="!showSidebar" @click="toggleSidebar" class="btn bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            Buka Sidebar
          </button>
        </div>

        <!-- Empty State Section -->
        <div
          v-if="selectedSection && (!selectedSection.contents || selectedSection.contents.length === 0) && (!selectedSection.quizzes || selectedSection.quizzes.length === 0)"
          class="text-center py-16"
        >
          <div class="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-600 mb-2">Belum Ada Materi atau Quiz</h3>
          <p class="text-slate-500">Section ini belum memiliki materi maupun quiz.</p>
        </div>
      </div>
    </main>
  </div>

  <!-- Pop-up Modal Lulus -->
  <div v-if="showPassedPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
      <div class="text-4xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold text-emerald-600 mb-2">Selamat Anda telah menyelesaikan Materi ini</h2>
      <p class="text-lg text-gray-700 mb-6">{{ passedMessage }}</p>
      <button @click="showPassedPopup = false" class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow hover:bg-gray-300 transition mt-4">Tutup</button>
    </div>
  </div>

  <!-- Modal Progress Section List (outside card loop) -->
  <div v-if="progressModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative">
      <button @click="progressModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-bold mb-4 text-blue-700">Progress Materi: {{ progressModalCourse?.course_title }}</h2>
      <div v-if="progressModalSections.length > 0" class="space-y-3 text-left">
        <div v-for="section in progressModalSections" :key="section.id" class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
          <span class="font-semibold text-gray-800">{{ section.title }}</span>
          <span v-if="section.completed" class="ml-auto px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7"/></svg>
            Selesai
          </span>
          <span v-else class="ml-auto px-2 py-1 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            Belum Selesai
          </span>
        </div>
      </div>
      <div v-else class="text-gray-500">Tidak ada data section untuk kursus ini.</div>
    </div>
  </div>
</template>

<script setup>
// Tooltip state for certificate button
const showCertTooltip = ref(false)
// Penilaian total per course
const totalCourseQuizPoints = computed(() => {
  if (!sections.value || sections.value.length === 0) return 0
  return sections.value.reduce((sum, section) => {
    if (!section.quizzes) return sum
    return sum + section.quizzes.reduce((s, quiz) => s + (quiz.points || 10), 0)
  }, 0)
})

const userCourseQuizPoints = computed(() => {
  if (!sections.value || sections.value.length === 0) return 0
  return sections.value.reduce((sum, section) => {
    if (!section.quizzes) return sum
    return sum + section.quizzes.reduce((s, quiz) => s + (quizScores.value[quiz.id] || 0), 0)
  }, 0)
})

const courseScorePercent = computed(() => {
  if (totalCourseQuizPoints.value === 0) return 0
  return Math.round((userCourseQuizPoints.value / totalCourseQuizPoints.value) * 100)
})
// Hanya bisa pilih section berikutnya jika section sebelumnya sudah selesai
function handleSectionClick(section, index) {
  if (index > 0 && !completedSections.value.includes(sections.value[index - 1].id)) {
    alert('Selesaikan pembelajaran section sebelumnya terlebih dahulu!')
    return
  }
  selectSection(section)
}
// Submit semua jawaban sekaligus
const canSubmitAll = computed(() => {
  if (!selectedSection.value || !selectedSection.value.quizzes) return false
  // Pastikan semua quiz sudah dijawab
  return selectedSection.value.quizzes.every(q => quizAnswers.value[q.id] !== undefined && quizAnswers.value[q.id] !== null && quizAnswers.value[q.id] !== '')
})

const submitAllAnswers = async () => {
  if (!auth.user?.token) {
    alert('Silakan login terlebih dahulu!')
    return
  }
  if (!selectedSection.value || !selectedSection.value.quizzes) {
    alert('Tidak ada quiz untuk section ini.')
    return
  }
  // Kumpulkan semua jawaban
  const answers = selectedSection.value.quizzes.map(q => ({
    quiz_id: q.id,
    user_answer: quizAnswers.value[q.id]
  }))
  try {
    const response = await $fetch(`/api/quizzes_section/${selectedSection.value.id}/submit-all`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.user.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        answers
      }
    })
    if (response.success) {
      // Update skor quiz
      response.scores?.forEach(r => {
        quizScores.value[r.quiz_id] = r.points_earned
      })
      alert('✅ Semua jawaban berhasil disubmit!')
      await fetchQuizScores()
      await autoCompleteSection(selectedSection.value.id)
    } else {
      alert('❌ Gagal submit semua jawaban: ' + (response.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Error submit all answers:', error)
    alert('❌ Gagal submit semua jawaban!')
  }
}
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const showSidebar = ref(true)
const sections = ref([])
const selectedSection = ref(null)
const completedSections = ref([])
const quizAnswers = ref({})
const certificateUrl = ref('')
const isCertificateLoading = ref(false)
const quizScores = ref({})
const showPassedPopup = ref(false)
const passedMessage = ref('')
const progressModalOpen = ref(false)
const progressModalCourse = ref(null)
const progressModalSections = ref([])

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const selectSection = (section) => {
  selectedSection.value = section
}

const saveQuizAnswer = (quizId, answer) => {
  quizAnswers.value[quizId] = answer
}

// Tambahkan function yang hilang
const calculatePoints = (quiz, userAnswer) => {
  switch (quiz.type) {
    case 'multiple':
      // Untuk multiple choice, cek apakah jawaban benar (default 10 poin jika benar)
      return userAnswer === quiz.correct_answer ? 10 : 0
      
    case 'truefalse':
      // Untuk true/false, cek apakah jawaban benar
      return userAnswer === quiz.correct_answer ? 10 : 0
      
    case 'short':
    case 'fill':
      // Untuk short answer/fill, beri poin default (nanti bisa di-review manual)
      return 5
      
    case 'likert':
      // Untuk likert scale, semua jawaban dapat poin
      return 10
      
    default:
      return 5 // Default poin
  }
}

// Function untuk scroll ke quiz tertentu
const scrollToQuiz = (quizId) => {
  // Tunggu sebentar untuk DOM update
  nextTick(() => {
    const quizElement = document.querySelector(`[data-quiz-id="${quizId}"]`)
    if (quizElement) {
      quizElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
      
      // Highlight quiz yang akan dikerjakan
      quizElement.classList.add('highlight-quiz')
      setTimeout(() => {
        quizElement.classList.remove('highlight-quiz')
      }, 2000)
    }
  })
}

// Integrasi endpoint baru: submitQuiz ke /api/quizzes_section/[id]/answer
const submitQuiz = async (quiz) => {
  const userAnswer = quizAnswers.value[quiz.id]
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    alert('Silakan pilih jawaban terlebih dahulu!')
    return
  }

  if (!auth.user?.token) {
    alert('Silakan login terlebih dahulu!')
    return
  }

  try {
    console.log('Submitting quiz:', quiz.id, 'Answer:', userAnswer)

    // Submit jawaban ke endpoint baru
    const response = await $fetch(`/api/quizzes_section/${quiz.id}/answer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.user.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        user_answer: userAnswer
      }
    })

    console.log('Quiz response saved:', response)

    // Update quiz scores
    if (response.success) {
      quizScores.value[quiz.id] = response.points_earned || 0

      // Show success message
      alert(`✅ Quiz berhasil disimpan!\nSkor: ${response.points_earned || 0} poin`)

      // Refresh quiz scores dari server
      await fetchQuizScores()

      // Logic navigasi yang diperbaiki
      await navigateAfterQuiz(quiz)
    }

  } catch (error) {
    console.error('Error submitting quiz:', error)

    let errorMessage = '❌ Gagal menyimpan quiz. '

    if (error.status === 401) {
      errorMessage = '❌ Sesi login expired. Silakan login ulang!'
      // navigateTo('/login')
    } else if (error.status === 400) {
      errorMessage = '❌ Data quiz tidak valid. Silakan coba lagi!'
    } else if (error.statusMessage) {
      errorMessage += error.statusMessage
    } else {
      errorMessage += 'Silakan coba lagi!'
    }

    alert(errorMessage)
  }
}

// Function untuk navigasi setelah submit quiz
const navigateAfterQuiz = async (currentQuiz) => {
  if (!selectedSection.value?.quizzes) return

  const currentQuizzes = selectedSection.value.quizzes
  const currentQuizIndex = currentQuizzes.findIndex(q => q.id === currentQuiz.id)
  
  // Cek apakah ada quiz berikutnya di section yang sama
  const nextQuizInSection = currentQuizzes[currentQuizIndex + 1]
  
  if (nextQuizInSection) {
    // Ada quiz berikutnya di section yang sama
    const confirmNext = confirm(`Quiz selesai! Lanjut ke quiz berikutnya: "${nextQuizInSection.question}"?`)
    if (confirmNext) {
      // Scroll ke quiz berikutnya
      scrollToQuiz(nextQuizInSection.id)
    }
  } else {
    // Tidak ada quiz lagi di section ini
    // Auto-complete section karena semua quiz sudah selesai
    await autoCompleteSection(selectedSection.value.id)
    
    const currentSectionIndex = sections.value.findIndex(s => s.id === selectedSection.value.id)
    const nextSection = sections.value[currentSectionIndex + 1]
    
    if (nextSection) {
      // Ada section berikutnya
      const continueToNext = confirm(`🎉 Section "${selectedSection.value.title}" selesai!\n\nLanjut ke section berikutnya: "${nextSection.title}"?`)
      if (continueToNext) {
        selectSection(nextSection)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // Sudah di section terakhir - semua sections selesai
      alert('🎉 Selamat! Anda telah menyelesaikan semua section di course ini!')
      
      // Cek apakah bisa dapat sertifikat
      if (showCertificateButton.value) {
        const getCert = confirm('Semua section selesai! Ingin mengambil sertifikat sekarang?')
        if (getCert) {
          getCertificate()
        }
      }
    }
  }
}

// Function untuk auto-complete section ketika semua quiz selesai
const autoCompleteSection = async (sectionId) => {
  // Cek apakah section sudah di-mark sebagai completed
  if (completedSections.value.includes(sectionId)) {
    console.log(`Section ${sectionId} already marked as completed`)
    return
  }

  try {
    console.log(`🎯 Auto-completing section: ${sectionId} (all quizzes finished)`)
    const response = await $fetch('/api/section_progress', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.user?.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        user_id: auth.user.id,
        section_id: sectionId,
        progress_percent: 100,
        is_completed: true
      }
    })
    completedSections.value.push(sectionId)
    console.log(`✅ Section ${sectionId} auto-marked as completed`)
    console.log('API Response:', response)
    await refreshSectionProgress();
  } catch (error) {
    console.error('❌ Error auto-completing section:', error)
    if (!completedSections.value.includes(sectionId)) {
      completedSections.value.push(sectionId)
    }
    await refreshSectionProgress();
  }
}

// Function untuk cek apakah section sudah selesai berdasarkan quiz completion
const checkSectionCompletion = (section) => {
  // Jika tidak ada quiz dan tidak ada content, section tidak bisa diselesaikan
  if ((!section.quizzes || section.quizzes.length === 0) && 
      (!section.contents || section.contents.length === 0)) {
    return false
  }
  
  // Jika ada quiz, semua quiz harus sudah dijawab
  if (section.quizzes && section.quizzes.length > 0) {
    const completedQuizzes = section.quizzes.filter(quiz => 
      quizScores.value[quiz.id] !== undefined
    )
    return completedQuizzes.length === section.quizzes.length
  }
  
  // Jika hanya ada content tanpa quiz, biarkan user manual mark complete
  return false
}

// Tambahkan computed untuk total poin dan kelulusan
const totalQuizPoints = computed(() => {
  if (!selectedSection.value || !selectedSection.value.quizzes) return 0
  return selectedSection.value.quizzes.reduce((sum, quiz) => sum + (quiz.points || 10), 0)
})

const userQuizPoints = computed(() => {
  if (!selectedSection.value || !selectedSection.value.quizzes) return 0
  return selectedSection.value.quizzes.reduce((sum, quiz) => sum + (quizScores.value[quiz.id] || 0), 0)
})

const isPassed = computed(() => {
  if (totalQuizPoints.value === 0) return false
  return (userQuizPoints.value / totalQuizPoints.value) * 100 >= 80
})

// Computed untuk section completion status
const sectionCompletionStatus = computed(() => {
  const status = {}
  sections.value.forEach(section => {
    status[section.id] = checkSectionCompletion(section)
  })
  return status
})

// Pastikan hanya id section yang valid dihitung
const sectionIds = computed(() => sections.value.map(s => s.id))
const totalCompletedSet = computed(() => {
  return new Set(
    [...completedSections.value, ...Object.keys(sectionCompletionStatus.value).filter(id => sectionCompletionStatus.value[id])]
      .filter(id => sectionIds.value.includes(id))
  )
})

const showCertificateButton = computed(() => {
  return totalCompletedSet.value.size === sections.value.length && sections.value.length > 0
})

const progressPercent = computed(() => {
  if (sections.value.length === 0) return 0
  return Math.round((totalCompletedSet.value.size / sections.value.length) * 100) || 0
})

// Watch untuk menampilkan modal lulus setelah semua computed didefinisikan
watch([isPassed, showCertificateButton], ([passed, completed]) => {
  if (passed && completed) {
    showPassedPopup.value = true
    passedMessage.value = '🎉 Selamat! Anda lulus materi ini dan bisa download sertifikat.'
    nextTick(() => {
      const certBtn = document.querySelector('button[aria-label="Ambil Sertifikat"]')
      if (certBtn) certBtn.scrollIntoView({ behavior: 'smooth' })
    })
    // Tambahkan notifikasi toast/alert
    alert('🎉 Progress 100%! Anda sudah bisa mengambil sertifikat. Klik tombol Ambil Sertifikat untuk download.')
  } else {
    showPassedPopup.value = false
  }
})

const handleCompletion = async (sectionId) => {
  if (!completedSections.value.includes(sectionId)) {
    try {
      await $fetch('/api/section_progress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.user?.token}`
        },
        body: {
          user_id: auth.user.id,
          section_id: sectionId,
          progress_percent: 100,
          is_completed: true
        }
      })
      completedSections.value.push(sectionId)
      await refreshSectionProgress();
      // Jika semua section sudah selesai, update course_progress
      if (totalCompletedSet.value.size === sections.value.length && sections.value.length > 0) {
        await postCourseProgress(100);
      }
    } catch (error) {
      console.error('Error marking section as completed:', error)
      await refreshSectionProgress();
      // Jika semua section sudah selesai, update course_progress
      if (totalCompletedSet.value.size === sections.value.length && sections.value.length > 0) {
        await postCourseProgress(100);
      }
    }
  }
// Fungsi untuk refresh progress section dari API agar progress bar langsung update
async function refreshSectionProgress() {
  try {
    const progressRes = await $fetch('/api/section_progress', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${auth.user.token}` },
      params: { user_id: auth.user.id }
    });
    const userProgress = (progressRes.progress || []).filter(
      p => p.user_id === auth.user.id && p.is_completed
    );
    completedSections.value = userProgress.map(p => p.section_id);
  } catch (error) {
    console.error('Error refreshing progress:', error);
  }
}

// Fungsi untuk POST ke api/course_progress
async function postCourseProgress(percent) {
  try {
    // Ambil courseId dari route
    const courseRes = await $fetch(`/api/course/${route.params.slug}`);
    const courseId = courseRes.course?.id;
    if (!courseId) return;
    // Hitung progress_percent
    const completed = totalCompletedSet.value.size;
    const total = sections.value.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    await $fetch('/api/course_progress', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.user?.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        user_id: auth.user.id,
        course_id: courseId,
        progress_percent: percent,
        completed_at: percent === 100 ? new Date().toISOString() : null
      }
    });
    // Optional: bisa tambahkan notifikasi sukses
    console.log('Course progress updated:', percent);
  } catch (error) {
    console.error('Error updating course progress:', error);
  }
}
}

const getCertificate = async () => {
  isCertificateLoading.value = true
  const token = auth.user?.token
  console.log('[getCertificate] Token:', token)
  if (!token) {
    alert('Sesi login Anda sudah habis. Silakan login ulang untuk mengambil sertifikat.')
    window.location.href = '/login'
    isCertificateLoading.value = false
    return
  }
  try {
    const res = await $fetch('/api/certificate', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      params: { slug: route.params.slug }
    })
    certificateUrl.value = res.certificateUrl
  } catch (err) {
    console.error('[getCertificate] Error:', err)
    alert('Gagal mengambil sertifikat!')
  } finally {
    isCertificateLoading.value = false
  }
}

const fetchQuizScores = async () => {
  if (!auth.user?.id) return
  try {
    const res = await $fetch('/api/quiz_response', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.user?.token}`
      },
      params: { user_id: auth.user.id }
    })
    quizScores.value = {}
    res.responses?.forEach(r => {
      quizScores.value[r.quiz_id] = r.points_earned
    })
  } catch (err) {
    console.error('Gagal mengambil skor quiz:', err)
  }
}

onMounted(async () => {
  auth.loadFromStorage?.()

  console.log('=== LOADING MATERI ===')
  console.log('Route slug:', route.params.slug)

  try {
    // Get course by slug
    const courseRes = await $fetch(`/api/course/${route.params.slug}`)
    
    if (!courseRes.course) {
      console.error('Course not found')
      return
    }

    const courseId = courseRes.course.id
    console.log('Course ID:', courseId)

    // Get sections with contents (sudah include contents dari API)
    const sectionsRes = await $fetch('/api/course_section', { 
      method: 'GET',
      params: { course_id: courseId }
    })

    console.log('Sections response:', sectionsRes)

    let courseSections = []
    
    if (Array.isArray(sectionsRes)) {
      courseSections = sectionsRes
    } else if (sectionsRes.sections && Array.isArray(sectionsRes.sections)) {
      courseSections = sectionsRes.sections
    }

    console.log('Parsed sections:', courseSections)

    // Fetch quizzes untuk setiap section
    for (const section of courseSections) {
      console.log(`Section: ${section.title}`)
      console.log(`Contents count: ${section.contents?.length || 0}`)
      
      // Log sample content jika ada
      if (section.contents && section.contents.length > 0) {
        console.log('Sample content:', section.contents[0])
      }

      // Fetch quizzes
      try {
        const quizRes = await $fetch(`/api/quizzes_section/${section.id}`)
        
        if (Array.isArray(quizRes)) {
          section.quizzes = quizRes
        } else if (quizRes.quizzes && Array.isArray(quizRes.quizzes)) {
          section.quizzes = quizRes.quizzes
        } else {
          section.quizzes = []
        }
        
        console.log(`Quizzes for ${section.title}:`, section.quizzes.length)
      } catch (error) {
        console.error(`Error fetching quizzes for section ${section.id}:`, error)
        section.quizzes = []
      }
    }

    sections.value = courseSections
    selectedSection.value = sections.value[0] || null

    console.log('Final sections:', sections.value)
    console.log('Selected section:', selectedSection.value)
    console.log('Selected section contents:', selectedSection.value?.contents)

    // Load user progress
    if (auth.user?.id) {
      try {
        const progressRes = await $fetch('/api/section_progress', { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth.user.token}`
          },
          params: { user_id: auth.user.id }
        })
        const userProgress = (progressRes.progress || []).filter(
          p => p.user_id === auth.user.id && p.is_completed
        )
        completedSections.value = userProgress.map(p => p.section_id)
      } catch (error) {
        console.error('Error loading progress:', error)
      }
    }

  } catch (error) {
    console.error('Error loading sections:', error)
  }

  fetchQuizScores()
})

function getYoutubeEmbed(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_\-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<style scoped>
@keyframes progressBarAnim {
  0% { width: 0; }
  100% { width: 100%; }
}
.animate-progress {
  animation: progressBarAnim 1.2s cubic-bezier(0.4,0,0.2,1);
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Highlight effect untuk quiz yang akan dikerjakan */
.highlight-quiz {
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.75);
  animation: pulse-highlight 1s ease-in-out;
}

@keyframes pulse-highlight {
  0% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
  }
  50% { 
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
  }
  100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
  }
}
</style>
