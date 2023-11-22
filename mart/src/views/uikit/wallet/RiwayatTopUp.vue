<template>
    <div class="card">
        <h5>Riwayat Top Up Hari Ini</h5>

        <table class="table">
            <thead>
                <tr>
                    <th>Tanggal</th>

                    <th>Lihat</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data">
                    <td>{{ item.tanggal }}</td>
                    <td>
                        <button class="p-button p-button-icon-only" @click="lihat(item.tanggal)">
                            <i class="pi pi-eye"></i>
                            <!-- Added the PrimeVue eye icon -->
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Dialog header="Dialog" v-model:visible="overlayVisible" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <p class="line-height-3 m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <template #footer>
            <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
        </template>
    </Dialog>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            data: [], // Variabel data kosong
            totalNominal: 0,
            jamSekarang: '',
            overlayVisible: false,
            selectedTanggal: ''
        };
    },
    mounted() {
        this.loadData(); // Panggil fungsi load data saat halaman dibuka
        this.getJamSekarang(); // Panggil fungsi untuk mendapatkan jam sekarang
    },
    methods: {
        async loadData() {
            try {
                const response = await axios.post('https://payment.citra-nusantara.or.id/api/admin/riwayat_top_up');
                this.data = response.data;
                console.log(this.data);
            } catch (error) {
                console.error(error);
            }
        },
        getJamSekarang() {
            const options = { timeZone: 'Asia/Jakarta', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            this.jamSekarang = new Date().toLocaleString('id-ID', options);
        },
        lihat(tanggal) {
            this.selectedTanggal = tanggal;
            this.overlayVisible = true;
        }
    }
};
</script>
