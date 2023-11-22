<template>
    <div className="card">
        <h5>Apakah anda yakin untuk menghapus produk {{ formData.name }} ?</h5>

        <p>Barcode : {{ formData.barcode }}</p>
        <p>Harga Jual : {{ formData.harga_jual }}</p>
        <div class="flex flex-wrap gap-2">
            <button class="btn btn-sm btn-danger" @click="proses">Ya</button>
            <button class="btn btn-sm btn-warning" @click="kembali">Kembali</button>
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
        kembali() {
            this.$router.push('/home/produk');
        },
        async proses() {
            // Mencegah pengiriman form bawaan browser
            console.log(JSON.stringify(this.formData));
            try {
                const response = await fetch('https://paymentbe.citra-nusantara.or.id/api/produk/hapus', {
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
        // Ambil data parameter dari URL
        const dataFromURL = this.$route.query.data;
        if (dataFromURL) {
            this.formData = JSON.parse(dataFromURL);
        }
        console.log(this.formData);
    }
};
</script>
