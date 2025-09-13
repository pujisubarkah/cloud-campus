<template>
  <div class="container mx-auto flex gap-8 mt-24">
    <ProfileSidebar :selected="selectedMenu" @select="selectedMenu = $event" />
    <div class="flex-1">
      <div v-if="loading" class="text-center py-8">Loading...</div>
      <div v-else-if="error" class="text-center py-8 text-red-500">{{ error }}</div>
      <form v-if="selectedMenu === 'profile' && !loading && !error" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center gap-4 mb-6">
          <!-- Avatar dengan prioritas: foto_url → DiceBear → Inisial -->
          <img 
            :src="avatarPreviewUrl || avatarUrl" 
            alt="Avatar" 
            class="w-20 h-20 rounded-full border object-cover"
            @error="handleAvatarError"
          />
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Upload Foto</label>
            <input type="file" accept="image/*" @change="onAvatarChange" class="file-input file-input-bordered w-full" />
            <span v-if="fotoError" class="text-red-500 text-sm">{{ fotoError }}</span>
            <label class="font-semibold mt-2">Avatar Seed (opsional)</label>
            <input v-model="form.avatar_seed" type="text" class="input input-bordered w-full" placeholder="Avatar Seed" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="font-semibold">Nama Lengkap</label>
            <input v-model="form.full_name" type="text" class="input input-bordered w-full" required />
          </div>
          <div>
            <label class="font-semibold">Email</label>
            <input v-model="form.email" type="email" class="input input-bordered w-full" required />
          </div>
          <div>
            <label class="font-semibold">NIP</label>
            <input v-model="form.nip" type="text" class="input input-bordered w-full" />
          </div>
          <div>
            <label class="font-semibold">Status</label>
            <select v-model="form.is_active" class="input input-bordered w-full">
              <option :value="true">Aktif</option>
              <option :value="false">Nonaktif</option>
            </select>
          </div>
          <div>
            <label class="font-semibold">Role</label>
            <input v-model="form.role" type="text" class="input input-bordered w-full" disabled />
          </div>
          <div>
            <label class="font-semibold">Jumlah Kursus Diikuti</label>
            <input :value="user.total_courses" type="text" class="input input-bordered w-full" disabled />
          </div>
        </div>
        <div class="text-sm text-gray-400 mb-4">Terdaftar sejak: {{ formatDate(user.created_at) }}</div>
        <button type="submit" class="btn btn-primary" :disabled="saving">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
        <div v-if="success" class="mt-4 text-green-600">Berhasil disimpan!</div>
        <div v-if="saveError" class="mt-4 text-red-600">{{ saveError }}</div>
      </form>

      <form v-if="selectedMenu === 'identitas' && !loading && !error" @submit.prevent="handleSaveIdentitas" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Identitas Kepegawaian</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="font-semibold">Unit Kerja</label>
            <input v-model="identitas.unit_kerja" type="text" class="input input-bordered w-full" />
          </div>
          <div>
            <label class="font-semibold">Jabatan</label>
            <input v-model="identitas.jabatan" type="text" class="input input-bordered w-full" />
          </div>
          <div>
            <label class="font-semibold">Pangkat/Golongan</label>
            <input v-model="identitas.pangkat_golongan" type="text" class="input input-bordered w-full" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Update Identitas</button>
        <div v-if="identitasSuccess" class="mt-4 text-green-600">Berhasil disimpan!</div>
        <div v-if="identitasError" class="mt-4 text-red-600">{{ identitasError }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import ProfileSidebar from '~/components/ProfileSidebar.vue';
import { useAuthStore } from '~/stores/auth';

const selectedMenu = ref('profile');
const identitas = ref({ id: '', unit_kerja: '', jabatan: '', pangkat_golongan: '', foto_url: '' });
const identitasSuccess = ref(false);
const identitasError = ref('');

async function fetchIdentitas() {
  identitasSuccess.value = false;
  identitasError.value = '';
  try {
    if (!auth.user || !auth.user.id) {
      identitasError.value = 'User belum login.';
      return;
    }
    const res = await fetch(`/api/user_identity?user_id=${auth.user.id}`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      const item = data.data[0];
      identitas.value = {
        id: item.id,
        unit_kerja: item.unit_kerja || '',
        jabatan: item.jabatan || '',
        pangkat_golongan: item.pangkat_golongan || '',
        foto_url: item.foto_url || '',
      };
    } else {
      identitas.value = { id: '', unit_kerja: '', jabatan: '', pangkat_golongan: '', foto_url: '' };
    }
  } catch (e) {
    identitasError.value = 'Gagal memuat identitas.';
  }
}

async function handleSaveIdentitas() {
  identitasSuccess.value = false;
  identitasError.value = '';
  try {
    let res, data;
    if (identitas.value.id) {
      res = await fetch(`/api/user_identity/${identitas.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit_kerja: identitas.value.unit_kerja,
          jabatan: identitas.value.jabatan,
          pangkat_golongan: identitas.value.pangkat_golongan,
          foto_url: identitas.value.foto_url,
        }),
      });
    } else {
      res = await fetch(`/api/user_identity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: auth.user?.id ?? '',
          unit_kerja: identitas.value.unit_kerja,
          jabatan: identitas.value.jabatan,
          pangkat_golongan: identitas.value.pangkat_golongan,
          foto_url: identitas.value.foto_url,
        }),
      });
    }
    data = await res.json();
    if (data.success) {
      identitasSuccess.value = true;
      await fetchIdentitas();
    } else {
      identitasError.value = data.message || 'Gagal menyimpan identitas.';
    }
  } catch (e) {
    identitasError.value = 'Gagal menyimpan identitas.';
  }
}

const auth = useAuthStore();
const user = ref<any>({});
const form = ref<any>({});
const loading = ref(true);
const error = ref('');
const saving = ref(false);
const success = ref(false);
const saveError = ref('');
const avatarFile = ref<File | null>(null);
const avatarPreviewUrl = ref<string>('');
const fotoError = ref('');

// --- AVATAR LOGIC ---
function generateInitials(name: string): string {
  if (!name || name.trim() === '') return '?';
  const words = name.trim().split(' ');
  const first = words[0]?.charAt(0).toUpperCase() || '';
  const last = words.length > 1 ? words[words.length - 1]?.charAt(0).toUpperCase() : '';
  return first + last;
}

function generateColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function handleAvatarError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/lanri_.png'; // fallback final
  img.onerror = null;
}

const avatarUrl = computed(() => {
  // 1. Prioritas utama: foto_url (trim untuk aman)
  if (form.value.foto_url && form.value.foto_url.trim() !== '') {
    return form.value.foto_url.trim();
  }

  // 2. Prioritas kedua: avatar_seed → DiceBear
  if (form.value.avatar_seed && form.value.avatar_seed.trim() !== '') {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(form.value.avatar_seed.trim())}`;
  }

  // 3. Fallback terakhir: inisial nama (SVG inline)
  const initials = generateInitials(form.value.full_name || '');
  const bgColor = generateColorFromName(form.value.full_name || '');
  return `image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='${bgColor}'/%3E%3Ctext x='50%25' y='50%25' font-size='32' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='Arial, sans-serif'%3E${initials}%3C/text%3E%3C/svg%3E`;
});

function formatDate(dateStr: string) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

onMounted(async () => {
  loading.value = true;
  error.value = '';
  auth.loadFromStorage();
  if (!auth.isLoggedIn || !auth.user) {
    error.value = 'Anda belum login.';
    loading.value = false;
    return;
  }
  const id = auth.user.id;
  try {
    const res = await fetch(`/api/users/students/${id}`);
    const data = await res.json();
    if (data.error) {
      error.value = data.error;
    } else {
      user.value = data.user;
      form.value = { ...data.user };
      // avatarUrl akan otomatis dihitung oleh computed property
    }
  } catch (e) {
    error.value = 'Gagal memuat data';
  }
  await fetchIdentitas();
  loading.value = false;
});

async function handleSubmit() {
  saving.value = true;
  success.value = false;
  saveError.value = '';
  try {
    if (!auth.isLoggedIn || !auth.user) {
      saveError.value = 'Anda belum login.';
      saving.value = false;
      return;
    }
    const id = auth.user.id;
    const payload = {
      full_name: form.value.full_name,
      email: form.value.email,
      nip: form.value.nip,
      avatar_seed: form.value.avatar_seed,
      is_active: form.value.is_active,
    };
    const res = await fetch(`/api/users/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.error) {
      saveError.value = data.error;
    } else {
      success.value = true;
      user.value = { ...user.value, ...payload };
    }
  } catch (e: any) {
    saveError.value = e.message || 'Gagal menyimpan data';
  }
  saving.value = false;
}

async function onAvatarChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    avatarFile.value = file;
    const previewUrl = URL.createObjectURL(file);
    avatarPreviewUrl.value = previewUrl; // Jika kamu masih butuh preview sementara
    fotoError.value = '';

    if (file.size > 2 * 1024 * 1024) {
      fotoError.value = 'Ukuran gambar maksimal 2 MB.';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Makarti_corpu');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dqlfyyigk/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        identitas.value.foto_url = data.secure_url.trim(); // ← TRIM DI SINI!
        fotoError.value = '';
      } else {
        fotoError.value = data.error?.message || 'Gagal upload gambar ke Cloudinary.';
        console.error('Cloudinary error:', data);
      }
    } catch (err) {
      fotoError.value = 'Gagal upload gambar ke Cloudinary.';
      console.error('Cloudinary upload exception:', err);
    }
  } else {
    avatarFile.value = null;
    avatarPreviewUrl.value = '';
  }
}
</script>

<style scoped>
/* Tambahkan style jika perlu */
.file-input {
  appearance: none;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #fff;
}
</style>