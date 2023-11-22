<template>
    <div class="card">
        <h5>Top Up E-Wallet</h5>
        Masukkan No. E-Wallet:
        <input type="text" class="form-control" @keydown="cari" v-model="no_wallet" />
        <br />
        <table class="table">
            <thead>
                <tr>
                    <th>Nomor</th>
                    <th>Nama</th>
                    <th>Saldo</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <!-- Baris-baris data akan ditambahkan di sini -->
                <tr v-for="(wlt, index) in hasil">
                    <td>{{ wlt.wallet_number }}</td>
                    <td>{{ wlt.name }}</td>
                    <td>{{ wlt.saldo }}</td>
                    <td>
                        <button @click="pilih(wlt.wallet_number)">Pilih</button>
                    </td>
                </tr>

                <!-- Tambahkan baris-baris lainnya sesuai kebutuhan -->
            </tbody>
        </table>
    </div>
    <Dialog header="Nominal" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <input type="number" v-model="nominal" class="form-control" placeholder="Masukkan nominal" />
        <template #footer>
            <Button label="Ok" @click="proses" icon="pi pi-check" class="p-button-outlined" />
        </template>
    </Dialog>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            hasil: [], // Data transaksi akan disimpan di sini
            no_wallet: '',
            selectedNomor: 0,
            display: false,
            nominal: 0
        };
    },
    methods: {
        async cari() {
            console.log(this.no_wallet);
            const response = await axios.post('https://payment.citra-nusantara.or.id/api/be/topup/cari_wallet', { no_wallet: this.no_wallet });
            this.hasil = response.data;
        },
        async pilih(nomor) {
            this.selectedNomor = nomor;
            this.display = true;
        },
        async proses() {
            const response = await axios.post('https://payment.citra-nusantara.or.id/api/be/topup/kasir_proses', { no_wallet: this.no_wallet, nominal: this.nominal });
            alert('berhasil');
            this.selectedNomor = 0;

            this.nominal = 0;
            (this.no_wallet = 0), (this.hasil = []);
            this.display = false;
        }
    }
};
</script>
