<template>
    <div class="col-12">
        <div class="card">
            <h5>{{ title }}</h5>
            <br />
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-12">
                    <span class="p-float-label">
                        <InputText v-model="inputNamaProduk" @input="proses_input" type="text" id="inputtext" />
                        <label for="inputtext">Masukkan Barcode disini</label>
                    </span>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Nama Produk</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(oke, index) in data_produk_search" :key="index">
                        <td>{{ oke.barcode }}</td>
                        <td>{{ oke.name }}</td>
                        <td><button class="btn btn-sm btn-warning" @click="tambahItem(index)">Tambahkan</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="col-12">
        <div class="card">
            <table class="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Barcode</th>
                        <th>Nama Produk</th>
                        <th>QTY</th>
                        <th>Harga Pokok</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ite, index) in item" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td><input type="text" class="form-control form-control-border" :value="ite.barcode" readonly /></td>
                        <td><input type="text" class="form-control form-control-border" :value="ite.nama_produk" readonly /></td>
                        <td><input type="number" class="form-control form-control-border" v-model="ite.inputQty" :placeholder="ite.qty" @input="ubahQty(index)" /></td>
                        <td><input type="number" class="form-control form-control-border" v-model="ite.inputHrg" :placeholder="ite.harga_pokok" @input="ubahHrg(index)" /></td>
                        <td><button class="btn btn-sm btn-danger" @click="hapusItem(index)">X</button></td>
                    </tr>
                </tbody>
            </table>

            <b>Pilih Koperasi:</b>

            <select id="produk" v-model="pilihan" class="form-control" placeholder="Koperasi Banin">
                <option value="Koperasi Banin" selected>Koperasi Banin</option>
                <option value="Koperasi Banat">Koperasi Banat</option>
            </select>
            <br />
            <b>Faktur/Toko/Catatan:</b>
            <input type="text" v-model="faktur" class="form-control" /><br />
            <button class="btn btn-sm btn-success" @click="orders">Tambahkan Barang</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            title: 'Pembelian Produk',
            inputNamaProduk: '',
            data_produk_search: [],
            item: [],
            inputHrg: '',
            pilihan: 'Koperasi Banin',
            faktur: ''
        };
    },
    methods: {
        async proses_input() {
            console.log(this.inputNamaProduk);
            const response = await fetch(`https://paymentbe.citra-nusantara.or.id/home/barcode/${this.inputNamaProduk}`);
            const data = await response.json();
            this.data_produk_search = data.data;
        },
        tambahItem(index) {
            const data = this.data_produk_search[index];
            this.item.push({
                barcode: data.barcode,
                nama_produk: data.name,
                qty: 1,
                inputQty: 1,
                harga_pokok: data.cost
            });
            console.log(data);
            this.inputNamaProduk = '';
            this.data_produk_search = [];
        },
        hapusItem(index) {
            this.item.splice(index, 1);
        },
        ubahQty(index) {
            this.item[index].qty = this.item[index].inputQty;
            console.log(this.item[index]);
        },
        ubahHrg(index) {
            this.item[index].harga_pokok = this.item[index].inputHrg;
            console.log(this.item[index]);
        },
        async orders() {
            console.log(JSON.stringify(this.item));
            const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/logic', {
                log: JSON.stringify(this.item),
                faktur: this.faktur,
                koperasi: this.pilihan
            });
            alert('berhasil ditambahkan');
            this.item = [];
            this.faktur = '';
            console.log(response);
        }
    }
};
</script>
