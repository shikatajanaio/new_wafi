<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import { ref, onBeforeMount, onMounted } from 'vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';

const headers = [
    { text: 'CABANG', value: 'cabang', sortable: true },
    { text: 'BARCODE', value: 'barcode', sortable: true },
    { text: 'NAMA PRODUK', value: 'name', sortable: true },
    { text: 'KATEGORI', value: 'kategori', sortable: true },
    { text: 'MERK', value: 'merk', sortable: true },
    { text: 'JUMLAH', value: 'stok', sortable: true },
    { text: 'HPP', value: 'cost', sortable: true },
    { text: 'HARGA JUAL', value: 'harga_jual', sortable: true }
];

// Buat variabel reaktif untuk items
const items = ref([]);
const searchValue = ref('');
const searchField = ref('barcode');

// Fungsi untuk mengambil data dari API
const fetchDataFromAPI = async () => {
    try {
        // Gantilah URL API sesuai dengan URL API yang Anda gunakan
        const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/stok_produk');
        const data = await response.json();

        // Setel nilai items dengan data dari API
        items.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const jenis_satuan_baru = ref('');
const keterangan_satuan_baru = ref('');
const item_edit = ref([]);
// Panggil fetchDataFromAPI ketika komponen selesai dimuat
onMounted(() => {
    fetchDataFromAPI();
});

const tampilkanEdit = ref(false);
const tampilkanTambah = ref(false);

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const edit = (item) => {
    console.log(item);
    item_edit.value = {};
    jenis_satuan_baru.value = '';
    tampilkanTambah.value = false;
    tampilkanEdit.value = true;
    item_edit.value = item;
};

const tambah = async () => {
    tampilkanEdit.value = false;
    item_edit.value = {};
    tampilkanTambah.value = true;
};

const simpan_tambah = async () => {
    const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/satuan/tambah', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sesuaikan dengan jenis konten yang digunakan oleh API Anda
        },
        body: JSON.stringify({
            jenis_satuan: jenis_satuan_baru.value,
            keterangan_satuan: keterangan_satuan_baru.value
        })
    });
    const data = await response.json();
    items.value = data;
    tampilkanTambah.value = false;
};

const hapus = async (item) => {
    const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/satuan/hapus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sesuaikan dengan jenis konten yang digunakan oleh API Anda
        },
        body: JSON.stringify({
            id: item.id
        })
    });
    const data = await response.json();
    items.value = data;
};

const simpan_edit = async () => {
    console.log(jenis_satuan_baru.value);
    item_edit.value.jenis_satuan = jenis_satuan_baru.value;
    console.log(item_edit.value);
    const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/satuan/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sesuaikan dengan jenis konten yang digunakan oleh API Anda
        },
        body: JSON.stringify(item_edit.value)
    });
    const data = await response.json();
    items.value = data;
    tampilkanEdit.value = false;
    item_edit.value = '';
    console.log(data);
};
</script>

<template>
    <div v-if="tampilkanEdit">
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <h5>Edit Nama satuan {{ item_edit.jenis_satuan }}</h5>
                    <div class="p-fluid formgrid">
                        <div class="field">
                            <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">Nama satuan Baru:</label>
                            <InputText id="nama_satuan" v-model="jenis_satuan_baru" type="text" :placeholder="item_edit.jenis_satuan" /><br /><br />

                            <Button label="Simpan" @click="simpan_edit" class="p-button-outlined mr-2 mb-2" style="margin-top: 2px" />
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
                    <h5>Tambahkan satuan</h5>
                    <div class="p-fluid formgrid">
                        <div class="field">
                            <label for="name3" class="col-12 mb-12 md:col-12 md:mb-0">Nama satuan Baru:</label>
                            <InputText id="nama_satuan" v-model="jenis_satuan_baru" type="text" :placeholder="item_edit.jenis_satuan" /><br /><br />
                            <label for="name3" class="col-12 mb-12 md:col-12 md:mb-0">Keterangan satuan Baru:</label>
                            <InputText id="nama_satuan" v-model="keterangan_satuan_baru" type="text" /><br /><br />

                            <Button label="Simpan" @click="simpan_tambah" class="p-button-outlined mr-2 mb-2" style="margin-top: 2px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <span class="p-float-label">
                    <InputText type="text" v-model="searchValue" class="form-control" />
                    <label for="inputtext">Cari Berdasarkan Barcode disini</label>
                </span>
                <h5>Stok Produk</h5>
                <EasyDataTable :headers="headers" :items="items" show-index :search-field="searchField" :search-value="searchValue"> </EasyDataTable>
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
