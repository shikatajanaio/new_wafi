<template>
    <div class="card">
        <h5>Riwayat Top Up Hari Ini</h5>
        Total TopUp Hari Ini : {{ totalNominal }}<br />
        Diprint Pada : {{ jamSekarang }}
        <table class="table">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Nominal</th>
                    <th>tgl</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id" @click="editRow(item.id)">
                    <td v-if="item.id !== editedRowId">{{ item.nama }}</td>
                    <td v-else><input type="text" v-model="editedRow.nama" @blur="saveRow()" /></td>
                    <td v-if="item.id !== editedRowId">{{ item.nominal }}</td>
                    <td v-else><input type="text" v-model="editedRow.nominal" @blur="saveRow()" /></td>
                    <td v-if="item.id !== editedRowId">{{ item.tgl }}</td>
                    <td v-else><input type="text" v-model="editedRow.tgl" @blur="saveRow()" /></td>
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
            data: [], // Variabel data kosong
            totalNominal: 0,
            jamSekarang: '',
            editedRowId: null,
            editedRow: {
                id: null,
                nama: '',
                nominal: '',
                tgl: ''
            }
        };
    },
    mounted() {
        this.loadData(); // Panggil fungsi load data saat halaman dibuka
        this.getJamSekarang(); // Panggil fungsi untuk mendapatkan jam sekarang
    },
    methods: {
        async loadData() {
            try {
                const response = await axios.post('https://payment.citra-nusantara.or.id/api/admin/top_hari_ini');
                this.data = response.data;

                const totalNominal = this.data.reduce((total, item) => total + parseInt(item.nominal), 0);
                this.totalNominal = totalNominal;
            } catch (error) {
                console.error(error);
            }
        },
        getJamSekarang() {
            const options = { timeZone: 'Asia/Jakarta', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            this.jamSekarang = new Date().toLocaleString('id-ID', options);
        },
        editRow(rowId) {
            this.editedRowId = rowId;
            const row = this.data.find(item => item.id === rowId);
            this.editedRow = { ...row };
        },
        saveRow() {
            const editedRowIndex = this.data.findIndex(item => item.id === this.editedRowId);
            this.data.splice(editedRowIndex, 1, this.editedRow);
            this.editedRowId = null;
            this.editedRow = {
                id: null,
                nama: '',
                nominal: '',
                tgl: ''
            };
        }
    }
};
</script>
