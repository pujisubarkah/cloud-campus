<template>
  <div class="container mx-auto flex gap-8 mt-24">
    <ProfileSidebar :selected="selectedMenu" @select="selectedMenu = $event" />
    <div class="flex-1">
      <div v-if="loading" class="text-center py-8">Loading...</div>
      <div v-else-if="error" class="text-center py-8 text-red-500">{{ error }}</div>
      <form v-if="selectedMenu === 'profile' && !loading && !error" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center gap-4 mb-6">
          <img :src="avatarPreviewUrl || avatarUrl" alt="Avatar" class="w-20 h-20 rounded-full border object-cover" />
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Upload Foto</label>
            <input type="file" accept="image/*" @change="onAvatarChange" class="file-input file-input-bordered w-full" />
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
            <input v-model="identitas.pangkat" type="text" class="input input-bordered w-full" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Simpan Identitas</button>
        <div v-if="identitasSuccess" class="mt-4 text-green-600">Berhasil disimpan!</div>
        <div v-if="identitasError" class="mt-4 text-red-600">{{ identitasError }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ProfileSidebar from '~/components/ProfileSidebar.vue';
import { useAuthStore } from '~/stores/auth';

const selectedMenu = ref('profile');
const identitas = ref({ unit_kerja: '', jabatan: '', pangkat: '' });
const identitasSuccess = ref(false);
const identitasError = ref('');

async function handleSaveIdentitas() {
  identitasSuccess.value = false;
  identitasError.value = '';
  // Simpan ke backend di sini (endpoint khusus atau gabung PUT profile)
  // Untuk demo, langsung sukses
  setTimeout(() => {
    identitasSuccess.value = true;
  }, 500);
}

const auth = useAuthStore();
const user = ref<any>({});
const form = ref<any>({});
const loading = ref(true);
const error = ref('');
const saving = ref(false);
const success = ref(false);
const saveError = ref('');
const avatarUrl = ref('');
const avatarPreviewUrl = ref('');
const avatarFile = ref<File|null>(null);

function formatDate(dateStr: string) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

onMounted(async () => {
  loading.value = true;
  error.value = '';
  // Pastikan Pinia store sudah sinkron dengan localStorage
  auth.loadFromStorage();
  // Pastikan user sudah login
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
      avatarUrl.value = form.value.avatar_seed
        ? `https://api.dicebear.com/7.x/identicon/svg?seed=${form.value.avatar_seed}`
        : '/lanri_.png';
    }
  } catch (e: any) {
    error.value = e.message || 'Gagal memuat data';
  }
  loading.value = false;
});

watch(() => form.value.avatar_seed, (val) => {
  avatarUrl.value = val ? `https://api.dicebear.com/7.x/identicon/svg?seed=${val}` : '/lanri_.png';
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

function onAvatarChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    avatarFile.value = input.files[0];
    avatarPreviewUrl.value = URL.createObjectURL(input.files[0]);
  } else {
    avatarFile.value = null;
    avatarPreviewUrl.value = '';
  }
}
</script>
