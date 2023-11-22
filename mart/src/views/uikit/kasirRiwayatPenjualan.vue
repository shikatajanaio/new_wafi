<template>
    <div class="card">
        <h4>Riwayat Penjualan</h4>
        Nama Kasir : {{ username.toUpperCase() }}<br />
        Tanggal Print : {{ absensi.jam }}
        <p></p>
        <table class="table">
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Lihat</th>
                </tr>
            </thead>
            <tbody>
                <!-- Baris-baris data akan ditambahkan di sini -->
                <tr v-for="(transaction, index) in transactions" :key="index">
                    <td>{{ transaction }}</td>
                    <td><button class="btn btn-sm btn-success" @click="lihat(transaction)">Lihat</button></td>
                </tr>
                <!-- Contoh baris data. Kamu bisa menambahkan lebih banyak baris data di sini -->
            </tbody>
        </table>
    </div>

    <div class="card">
        <h6>Total Pendapatan Hari Ini : Rp {{ pendapatanTotal.pendapatan }},-</h6>
    </div>
    <Dialog header="Data Penjualan" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '80vw' }" :modal="true">
        Kasir : {{ username.toUpperCase() }}<br />
        Tanggal : {{ tgl }}<br />
        Total Penjualan : {{ pendapatanHarian.pendapatan }}
        <table class="table">
            <thead>
                <tr>
                    <th>Kode</th>
                    <th>Item</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                    <th>Harga Jual</th>
                    <th>Diskon</th>
                    <th>Harga Total</th>
                </tr>
            </thead>
            <tbody>
                <!-- Baris-baris data akan ditambahkan di sini -->
                <tr v-for="(transaction1, index) in riwayatHarian" :key="index">
                    <td>{{ transaction1.kode_transaksi }}</td>
                    <td>{{ transaction1.nama }}</td>
                    <td>{{ transaction1.jumlah }}</td>
                    <td>{{ transaction1.tgl }} {{ transaction1.jam }}</td>
                    <td>{{ transaction1.harga_jual }}</td>
                    <td>{{ transaction1.diskon }}%</td>
                    <td>{{ transaction1.harga_jual * transaction1.jumlah - (transaction1.harga_jual * transaction1.jumlah * transaction1.diskon) / 100 }}</td>
                </tr>
                <!-- Contoh baris data. Kamu bisa menambahkan lebih banyak baris data di sini -->
            </tbody>
        </table>
        <template #footer> </template>
    </Dialog>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            transactions: [], // Variabel untuk menyimpan data transaksi
            username: Cookies.get('token'),
            totalHargaJual: 0,
            absensi: {},
            pendapatanTotal: 0,
            pendapatanHarian: 0,
            riwayatHarian: [],
            display: false,
            tgl: ''
        };
    },
    created() {
        this.fetchTransactions();
        this.calculateTotalHargaJual(); // Hitung total harga jual saat komponen dibuat
    },
    methods: {
        async fetchTransactions() {
            try {
                const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/kasir/riwayat_penjualan_kasir', { username: this.username }); // Ganti URL_ENDPOINT dengan URL yang sesuai
                const response2 = await axios.post('https://paymentbe.citra-nusantara.or.id/api/kasir/jam_masuk', { username: this.username });
                const response3 = await axios.get('https://paymentbe.citra-nusantara.or.id/api/kasir/pendapatan_total_kasir/' + Cookies.get('token'));
                this.pendapatanTotal = response3.data;
                this.transactions = response.data; // Simpan data transaksi dari respons ke variabel transactions
                this.absensi = response2.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        calculateTotalHargaJual() {
            // Menghitung total harga jual dari data transaksi
            this.totalHargaJual = this.transactions.reduce((total, transaction) => {
                return total + transaction.diskon;
            }, 0);
        },
        async pendapatan() {
            axios
                .get('https://paymentbe.citra-nusantara.or.id/api/kasir/pendapatan_hari_ini/ridwan' + Cookies.get('token')) // Ganti dengan URL endpoint Anda
                .then((response) => {
                    this.pendapatan = response.data;
                })
                .catch((error) => {
                    console.error('Terjadi kesalahan:', error);
                });
        },
        async lihat(tgl) {
            const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/kasir/penjualan_harian', { username: this.username, tgl: tgl });
            const response3 = await axios.get('https://paymentbe.citra-nusantara.or.id/api/kasir/pendapatan_total_kasir/' + Cookies.get('token'));
            const response4 = await axios.get('https://paymentbe.citra-nusantara.or.id/api/kasir/pendapatan_harian_kasir/' + Cookies.get('token') + '/' + tgl);
            this.riwayatHarian = response.data;
            this.pendapatanHarian = response4.data;
            console.log(this.riwayatHarian);
            this.tgl = tgl;
            this.display = true;
        }
    }
};
</script>
