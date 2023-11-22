<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import { ref, onBeforeMount, onMounted } from 'vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import { useRouter } from 'vue-router';

// Import instance router dari app
const router = useRouter();
const kategori = ref('');
const merk = ref('');
const satuan = ref('');
const nama_produk = ref('');
const barcode = ref('');
const harga_jual = ref('');
const keterangan_produk_baru = ref('');
const item_edit = ref([]);
const headers = [
    { text: 'INVOICE', value: 'invoice', sortable: true },
    { text: 'NAMA', value: 'nama', sortable: true },
    { text: 'No. E-WALLET', value: 'wallet', sortable: true },
    { text: 'NOMINAL', value: 'nominal', sortable: true },
    { text: 'JENIS', value: 'jenis', sortable: true },
    { text: 'KETERANGAN', value: 'keterangan', sortable: true },
    { text: 'PAYMENT URL', value: 'payment_url', sortable: true },
    { text: 'STATUS', value: 'status', sortable: true }
];

// Buat variabel reaktif untuk items
const items = ref([]);
const searchValue = ref('');
const searchField = ref('wallet');
// Fungsi untuk mengambil data dari API
const fetchDataFromAPI = async () => {
    try {
        // Gantilah URL API sesuai dengan URL API yang Anda gunakan
        const response = await fetch('https://payment.citra-nusantara.or.id/transaksi_wallet/transaksi_wallet');
        const merek = await fetch('https://paymentbe.citra-nusantara.or.id/api/merk');
        const data = await response.json();

        // Setel nilai items dengan data dari API
        items.value = data;
        merk.value = await merek.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

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
    const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/tambah', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sesuaikan dengan jenis konten yang digunakan oleh API Anda
        },
        body: JSON.stringify({
            jenis_produk: jenis_produk_baru.value,
            keterangan_produk: keterangan_produk_baru.value
        })
    });
    const data = await response.json();
    items.value = data;
    tampilkanTambah.value = false;
};

const hapus = async (item) => {
    const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/hapus', {
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

const edit_produk = (item) => {
    console.log(item);
    // Menggunakan router.push untuk navigasi
    router.push({
        path: '/home/produk/edit_produk',
        query: {
            data: JSON.stringify(item)
        }
    });
};
const hapus_produk = (item) => {
    console.log(item);
    // Menggunakan router.push untuk navigasi
    router.push({
        path: '/home/produk/hapus_produk',
        query: {
            data: JSON.stringify(item)
        }
    });
};
const simpan_edit = async () => {
    console.log(jenis_produk_baru.value);
    item_edit.value.jenis_produk = jenis_produk_baru.value;
    console.log(item_edit.value);
    const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/edit', {
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
                    <h5>Edit Nama produk {{ item_edit.name }}</h5>
                    <div class="p-fluid formgrid">
                        <div class="field">
                            <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">Nama produk Baru:</label>
                            <InputText id="nama_produk" v-model="jenis_produk_baru" type="text" :placeholder="item_edit.name" /><br /><br />

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
                    <h5>Tambahkan produk</h5>
                    <div class="p-fluid formgrid">
                        <div class="field">
                            <label for="name3" class="col-12 mb-12 md:col-12 md:mb-0">Nama produk Baru:</label>
                            <InputText id="nama_produk" v-model="nama_produk" type="text" /><br />
                            <label for="name3" class="col-12 mb-12 md:col-12 md:mb-0">Barcode:</label>
                            <InputText id="barcode" v-model="barcode" type="text" /><br />
                            <label for="name3" class="col-12 mb-12 md:col-12 md:mb-0">Barcode:</label>
                            <InputText id="barcode" v-model="barcode" type="text" /><br />
                            <label for="name3" class="col-12 mb-12 md:col-12 md:mb-0">Harga Jual::</label>
                            <InputText id="barcode" v-model="harga_jual" type="number" /><br />

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
                    <label for="inputtext">Cari Berdasarkan No E-Wallet disini</label>
                </span>
                <p></p>
                <a href="http://topup.al-wafi.sch.id/" class="btn btn-primary" style="margin-top: 2px" target="_blank"> Top Up </a>

                <h5>Daftar Transaksi E-Wallet</h5>

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
