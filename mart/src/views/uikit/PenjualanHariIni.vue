<template>
    <div class="card">
        <h4>Penjualan Hari Ini</h4>
        Nama Kasir : {{ username.toUpperCase() }}<br />
        Jam Masuk : {{ absensi.jam }}
        <p></p>
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
                <tr v-for="(transaction, index) in transactions" :key="index">
                    <td>{{ transaction.kode_transaksi }}</td>
                    <td>{{ transaction.nama }}</td>
                    <td>{{ transaction.jumlah }}</td>
                    <td>{{ transaction.tgl }} {{ transaction.jam }}</td>
                    <td>{{ transaction.harga_jual }}</td>
                    <td>{{ transaction.diskon }}%</td>
                    <td>{{ transaction.harga_jual * transaction.jumlah - (transaction.harga_jual * transaction.jumlah * transaction.diskon) / 100 }}</td>
                </tr>
                <!-- Contoh baris data. Kamu bisa menambahkan lebih banyak baris data di sini -->
            </tbody>
        </table>
    </div>

    <div class="card">
        <h6>Total Pendapatan Hari Ini : Rp {{ pendapatanTotal.pendapatan }},-</h6>
    </div>
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
            pendapatanTotal: 0
        };
    },
    created() {
        this.fetchTransactions();
        this.calculateTotalHargaJual(); // Hitung total harga jual saat komponen dibuat
    },
    methods: {
        async fetchTransactions() {
            try {
                const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/kasir/penjualan_hari_ini', { username: this.username }); // Ganti URL_ENDPOINT dengan URL yang sesuai
                const response2 = await axios.post('https://paymentbe.citra-nusantara.or.id/api/kasir/jam_masuk', { username: this.username });
                const response3 = await axios.get('https://paymentbe.citra-nusantara.or.id/api/kasir/pendapatan_hari_ini/' + Cookies.get('token'));
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
        }
    }
};
</script>
