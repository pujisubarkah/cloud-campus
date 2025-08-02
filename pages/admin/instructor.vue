<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Daftar Instruktur</h1>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Jumlah Kursus</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="instructor in instructors" :key="instructor.id">
            <td>{{ instructor.name }}</td>
            <td>{{ instructor.email }}</td>
            <td>{{ instructor.totalCourses }}</td>
            <td>
              <span :class="instructor.status === 'aktif' ? 'badge badge-success' : 'badge badge-error'">
                {{ instructor.status }}
              </span>
            </td>
            <td>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-info">Detail</button>
                <button class="btn btn-sm btn-warning">Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const instructors = [
  {
    id: 1,
    name: 'Puji Subarkah',
    email: 'puji@example.com',
    totalCourses: 5,
    status: 'aktif',
  },
  {
    id: 2,
    name: 'Jarjit Singh',
    email: 'jarjit@example.com',
    totalCourses: 3,
    status: 'non-aktif',
  },
];
</script>
