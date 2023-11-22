<template>
    <div class="card">
        <h4>Transfer Gudang</h4>
        Dari:
        <p>
            <select v-model="selectedDari" class="form-control">
                <option v-for="item in data" :key="item.id" :value="item.nama_cabang">{{ item.nama_cabang }}</option>
            </select>
            Ke:
            <select v-model="selectedKe" class="form-control">
                <option v-for="item in data" :key="item.id" :value="item.nama_cabang">{{ item.nama_cabang }}</option>
            </select>
        </p>
        <p></p>
        <input type="text" class="form-control" v-model="barangSearch" @input="searchBarang" placeholder="Cari barang" />
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <!-- Isi tabel dapat ditambahkan dinamis melalui Vue.js atau data statis -->
                <tr v-for="(hasil, index) in hasilSearch" :key="index">
                    <td>{{ hasil.name }}</td>
                    <td>{{ hasil.stok }}</td>
                    <td><button @click="tambah(index)">Pilih</button></td>
                </tr>

                <!-- ... Tambahkan baris sesuai kebutuhan -->
            </tbody>
        </table>
    </div>
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Hapus</th>
                </tr>
            </thead>
            <tbody>
                <!-- Isi tabel dapat ditambahkan dinamis melalui Vue.js atau data statis -->
                <tr v-for="(barang, index) in listBarang" :key="index">
                    <td>{{ barang.name }}</td>
                    <td>{{ barang.stok }}</td>
                    <td><input class="form-control" type="number" v-model="listBarang[index].jumlah" @change="ubahQty(index)" /></td>
                    <td><button class="btn btn-sm btn-danger" @click="hapusItem(index)">X</button></td>
                </tr>

                <!-- ... Tambahkan baris sesuai kebutuhan -->
            </tbody>
        </table>
        <button class="btn btn-sm btn-warning" @click="proses">Simpan</button>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            data: [],
            selectedDari: '',
            selectedKe: '',
            barangSearch: '',
            listBarang: [],
            hasilSearch: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            try {
                const response = await axios.get('https://paymentbe.citra-nusantara.or.id/api/cabang'); // Ganti URL dengan URL API yang sesuai
                this.data = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async searchBarang() {
            // Fungsi untuk melakukan fetch API berdasarkan teks pencarian
            console.log(`https://paymentbe.citra-nusantara.or.id/api/stok_produk/search/` + this.barangSearch + '/' + this.selectedDari);
            try {
                const response = await axios.get(`https://paymentbe.citra-nusantara.or.id/api/stok_produk/search/` + this.barangSearch + '/' + this.selectedDari);
                this.hasilSearch = response.data;
            } catch (error) {
                console.log(this.barangSearch);
                console.error('Error searching data:', error);
            }
        },
        tambah(index) {
            console.log(this.hasilSearch[index]);
            if (this.hasilSearch[index].stok == 0) {
                alert('stok habis');
            } else {
                this.listBarang.push(this.hasilSearch[index]);
                this.hasilSearch = [];
                this.barangSearch = '';
            }
        },
        ubahQty(index) {
            if (this.listBarang[index].stok < this.listBarang[index].jumlah) {
                alert('stok tidak memadai');
                this.listBarang[index].jumlah = 1;
            }
        },
        hapusItem(index) {
            this.listBarang.splice(index, 1);
        },
        async proses() {
            try {
                const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/gudang/transfer/proses', {
                    dari: this.selectedDari,
                    ke: this.selectedKe,
                    list: JSON.stringify(this.listBarang)
                    // ... tambahkan properti lainnya sesuai kebutuhan
                });

                console.log('Respon dari server:', response.data);
                alert('Data berhasil disimpan');
                this.listBarang = [];
                this.hasilSearch = [];
                this.barangSearch = '';
            } catch (error) {
                console.error('Error saat mengirim data:', error);
            }
        }
    }
};
</script>
