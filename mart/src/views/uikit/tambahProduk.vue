<template>
    <div>
        <div class="card">
            <h5>Tambah Produk Baru</h5>
            <form @submit="proses">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md-6">
                        <label for="kategoriSelect">Kategori:</label>
                        <select id="kategoriSelect" v-model="formData.selectedKategori" class="form-control">
                            <option value="">Pilih Kategori</option>
                            <option v-for="item in kategori" :value="item.nama_kategori">{{ item.nama_kategori }}</option>
                        </select>
                    </div>
                    <div class="field col-12 md-6">
                        <label for="merkSelect">Merk:</label>
                        <select id="merkSelect" v-model="formData.selectedMerk" class="form-control">
                            <option value="">Pilih Merk</option>
                            <option v-for="item in merk" :value="item.nama_merk">{{ item.nama_merk }}</option>
                        </select>
                    </div>
                    <div class="field col-12 md-6">
                        <label for="merkSelect">Satuan:</label>
                        <select id="merkSelect" v-model="formData.selectedSatuan" class="form-control">
                            <option value="">Pilih Satuan</option>
                            <option v-for="item in satuan" :value="item.jenis_satuan">{{ item.jenis_satuan }}</option>
                        </select>
                    </div>
                    <div class="field col-12 md-6">
                        <label for="nama_produk">Nama Produk:</label>
                        <input id="nama_produk" type="text" v-model="formData.nama_produk" class="form-control" required />
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
                nama_produk: '',
                barcode: '',
                harga_jual: '',
                selectedMerk: '',
                selectedKategori: '',
                selectedSatuan: ''
            },
            merk: [], // Variabel ini harus menjadi array
            kategori: [], // Variabel ini harus menjadi array
            satuan: []
        };
    },
    methods: {
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
                const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/tambah', {
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
    }
};
</script>
