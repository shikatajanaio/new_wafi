<script>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            headers: [
                { text: 'NAMA KATEGORI', value: 'nama_kategori' },
                { text: 'Operation', value: 'operation' }
            ],
            items: [],
            nama_kategori_baru: '',

            item_edit: {},
            tampilkanEdit: false,
            tampilkanTambah: false,
            editedItem: null // Added editedItem property to track the edited item
        };
    },
    methods: {
        fetchDataFromAPI() {
            fetch('https://paymentbe.citra-nusantara.or.id/api/kategori')
                .then((response) => response.json())
                .then((data) => {
                    this.items = data;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        edit(item) {
            this.item_edit = { ...item };
            this.nama_kategori_baru = '';
            this.tampilkanTambah = false;
            this.tampilkanEdit = true;
        },
        tambah() {
            this.tampilkanEdit = false;
            this.item_edit = {};
            this.tampilkanTambah = true;
        },
        async simpan_tambah() {
            const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/kategori/tambah', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nama_kategori: this.nama_kategori_baru
                })
            });
            const data = await response.json();
            this.items = data;
            this.tampilkanTambah = false;
            toast.success('Kategori Baru berhasil disimpan');
        },
        async hapus(item) {
            const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/kategori/hapus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.id
                })
            });
            const data = await response.json();
            this.items = data;
            toast.danger('Data berhasil dihapus');
        },
        async simpan_edit() {
            this.item_edit.nama_kategori = this.nama_kategori_baru;
            const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/kategori/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.item_edit)
            });
            const data = await response.json();
            this.items = data;
            this.tampilkanEdit = false;
            this.item_edit = {};
        },
        async editCell(item) {
            this.editedItem = item; // Set the editedItem to the selected item
        },
        async saveCell(id) {
            console.log(this.items[id]); // Clear the editedItem when saving the cell
            const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/kategori/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.items[id])
            });
            this.editedItem = null;
            toast.success('Data berhasil disimpan'); // Show toast after saving
        },
        closeEdit() {
            this.editedItem = null;
        }
    },
    created() {
        this.fetchDataFromAPI();
    }
};
</script>

<template>
    <div v-if="tampilkanEdit">
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <h5>Edit Nama Kategori {{ item_edit.nama_kategori }}</h5>
                    <div class="p-fluid formgrid">
                        <div class="field">
                            <label for="nama_kategori" class="col-12 mb-2 md:col-2 md:mb-0">Nama Kategori Baru:</label>
                            <input class="form-control" id="nama_kategori" v-model="nama_kategori_baru" type="text" :placeholder="item_edit.nama_kategori" /><br /><br />
                            <button @click="simpan_edit" class="btn btn-outline-primary mr-2 mb-2" style="margin-top: 2px">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="tampilkanTambah">
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <h5>Tambahkan Kategori</h5>
                    <div class="p-fluid formgrid">
                        <div class="field">
                            <label for="nama_kategori" class="col-12 mb-12 md:col-12 md:mb-0">Nama Kategori Baru:</label>
                            <input class="form-control" id="nama_kategori" v-model="nama_kategori_baru" type="text" :placeholder="item_edit.nama_kategori" /><br /><br />
                            <button @click="simpan_tambah" class="btn btn-outline-primary mr-2 mb-2" style="margin-top: 2px">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <button @click="tambah" class="btn btn-outline-primary mr-2 mb-2" style="margin-top: 2px">Kategori Baru</button>
                <h5>Kategori</h5>

                <table class="table">
                    <thead>
                        <tr>
                            <th>NAMA KATEGORI</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index">
                            <td v-if="editedItem === item">
                                <input class="form-control" v-model="item.nama_kategori" @blur="saveCell(index)" @keyup.enter="saveCell(index)" />
                            </td>
                            <td v-else @dblclick="editCell(item)">{{ item.nama_kategori }}</td>
                            <td>
                                <div class="operation-wrapper">
                                    <button class="btn btn-danger btn-sm mr-2 mb-2" @click="hapus(item)">
                                        <i class="pi pi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
