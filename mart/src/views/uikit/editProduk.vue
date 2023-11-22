<template>
    <div>
        <div class="card">
            <h5>Edit Produk</h5>
            <form @submit="proses">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md-6">
                        <label for="kategoriSelect">Kategori:</label>
                        <select id="kategoriSelect" v-model="formData.kategori" class="form-control">
                            <option value="">Pilih Kategori</option>
                            <option v-for="item in kategori" :value="item.nama_kategori">{{ item.nama_kategori }}</option>
                        </select>
                    </div>
                    <div class="field col-12 md-6">
                        <label for="merkSelect">Merk:</label>
                        <select id="merkSelect" v-model="formData.merk" class="form-control">
                            <option value="">Pilih Merk</option>
                            <option v-for="item in merk" :value="item.nama_merk">{{ item.nama_merk }}</option>
                        </select>
                    </div>
                    <div class="field col-12 md-6">
                        <label for="merkSelect">Satuan:</label>
                        <select id="merkSelect" v-model="formData.satuan" class="form-control">
                            <option v-for="item in satuan" :value="item.jenis_satuan">{{ item.jenis_satuan }}</option>
                        </select>
                    </div>
                    <div class="field col-12 md-6">
                        <label for="nama_produk">Nama Produk:</label>
                        <input id="nama_produk" type="text" v-model="formData.name" class="form-control" required />
                    </div>
                    <div class="field col-12 md-6">
                        <label for="barcode">Barcode:</label>
                        <input id="barcode" type="text" v-model="formData.barcode" class="form-control" required />
                    </div>
                    <div class="field col-12 md-6">
                        <label for="harga_jual">Harga Jual:</label>
                        <input id="harga_jual" type="text" v-model="formData.harga_jual" class="form-control" required />
                    </div>
                    <center>
                        <button type="submit" class="p-button mr-2 mb-2">Tambahkan</button>
                    </center>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            formData: {
                id: '',
                name: '',
                barcode: '',
                harga_jual: '',
                merk: '',
                kategori: '',
                satuan: ''
            },
            merk: [], // Variabel ini harus menjadi array
            kategori: [], // Variabel ini harus menjadi array
            satuan: []
        };
    },
    methods: {
        tes() {
            console.log(this.formData);
        },
        async fetchMerkData() {
            try {
                const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/merk');
                if (response.ok) {
                    const data = await response.json();
                    this.merk = data;
                } else {
                    console.error('Gagal mengambil data merk dari API');
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        },
        async fetchKategoriData() {
            try {
                const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/kategori');
                if (response.ok) {
                    const data = await response.json();
                    this.kategori = data;
                } else {
                    console.error('Gagal mengambil data kategori dari API');
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        },
        async fetchSatuanData() {
            try {
                const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/satuan');
                if (response.ok) {
                    const data = await response.json();
                    this.satuan = data;
                } else {
                    console.error('Gagal mengambil data kategori dari API');
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        },
        async proses(event) {
            event.preventDefault(); // Mencegah pengiriman form bawaan browser
            console.log(JSON.stringify(this.formData));
            try {
                const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/edit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Sesuaikan dengan jenis konten yang digunakan oleh API Anda
                    },
                    body: JSON.stringify(this.formData)
                });

                if (response.ok) {
                    this.$router.push('/home/produk');
                    // Lakukan sesuatu dengan respon dari API jika diperlukan
                } else {
                    const data = await response.json();
                    console.log('Respon dari API:', data);
                    console.error('Gagal mengirim permintaan POST ke API');
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        }
    },
    created() {
        this.fetchMerkData();
        this.fetchKategoriData();
        this.fetchSatuanData();
        // Ambil data parameter dari URL
        const dataFromURL = this.$route.query.data;
        if (dataFromURL) {
            this.formData = JSON.parse(dataFromURL);
        }
        console.log(this.formData);
    }
};
</script>
