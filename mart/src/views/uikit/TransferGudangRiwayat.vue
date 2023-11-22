<template>
    <div class="card">
        <h4>Riwayat Transfer Gudang</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>Dari</th>
                    <th>Ke</th>
                    <th>ID Item</th>
                    <th>Total</th>
                    <th>Tanggal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                    <td>{{ transaction.dari }}</td>
                    <td>{{ transaction.ke }}</td>
                    <td>{{ transaction.id_item }}</td>
                    <td>{{ transaction.jumlah }}</td>
                    <td>{{ transaction.tgl }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            transactions: [] // Data transaksi akan disimpan di sini
        };
    },
    created() {
        this.loadData(); // Panggil fungsi loadData saat komponen dibuat
    },
    methods: {
        async loadData() {
            try {
                const response = await axios.get('https://paymentbe.citra-nusantara.or.id/api/gudang/transfer/riwayat');
                this.transactions = response.data; // Mengisi data transaksi dengan hasil dari permintaan GET
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
};
</script>
