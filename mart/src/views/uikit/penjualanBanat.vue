<template>
  <div className="card">
      <table class="table">

<tbody>
<tr>
  <td>Penjualan </td>
  <td>Koperasi Banat</td>
  <td><h4>Rp. {{total}},- </h4></td>
</tr>
<tr>
  <td>Tanggal Transaksi</td>
  <td>00-00-000</td>

</tr>
<tr>
  <td><div class="p-fluid formgrid grid">
                  <div class="field col-12 md:col-12">
                      <span class="p-float-label">
                      <InputText  type="text" v-model="inputNamaProduk" id="inputtext" @keyup.enter="proses_input" required/>
                      <label  for="inputtext" ref="myInput">Masukkan Barcode disini</label>
                      </span>
                  </div>
              
              </div></td>
  <td>
    <Dialog header="Pembayaran" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                  <div v-if="metode_pembayaran == 'cash'">
      <p class="line-height-3 m-0">
        <table class="table table-striped">
  <thead>
    <tr>
      <th>Total Belanja</th>
      <th>Rp {{total}},-</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cash</td>
      <td><input type="number" v-model="cash" @change="kembalianChange" class="form-control"></td>
    </tr>
    <tr>
      <td>Kembalian</td>
      <td>{{ kembalian }}</td>

    </tr>

  </tbody>
</table>             
      </p>
          </div>
          <div v-if="metode_pembayaran == 'wallet'">
      <p class="line-height-3 m-0">
        <table class="table table-striped">
  <thead>
    <tr>
      <th>Total Belanja</th>
      <th>Rp {{total}},-</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>No Wallet</td>
      <td><input type="number" v-model="nowallet" @keyup.enter="cariWallet" class="form-control"></td>
    </tr>
    <tr>
      <td>Nama</td>
      <td>{{ data_wallet.name }}</td>

    </tr>
    <tr>
      <td>Saldo</td>
      <td>Rp{{ data_wallet.saldo }},-</td>

    </tr> 

  </tbody>
</table>              
      </p>
          </div>
                  <template #footer>
                      <Button label="Bayar" @click="bayarProceed" icon="pi pi-check" class="p-button-outlined" />
                  </template>
              </Dialog>
              
              <Button label="Bayar E-Wallet" icon="pi pi-external-link" style="width: auto" @click="open('wallet')" />

    
    </td>


</tr>
</tbody>
</table>

  </div>
  <div className="card">
      <table class="table table-striped">
  <thead>
    <tr>
      <th>No.</th>
      <th>Item</th>
      <th>Harga</th>
      <th>Jumlah</th>
      <th>Diskon</th>
      <th>Subtotal</th>
      <th>X</th>
    </tr>
  </thead>
  <tbody>
  <tr v-for="ite, index in item" :key="index">
      <td>{{index + 1}}</td>
      <td>{{ite.name}}</td>
      <td>{{ite.harga_jual}}</td>
      <td><input type="number" placeholder=1 class="form-control" v-model="ite.jumlah" @change="ubahQty(index)"/></td>
      <td><input type="number" placeholder="dalam persem (%)" v-model="ite.diskon" class="form-control" @change="applyDiskon(index)" /></td>
      <td>{{ ite.subtotal }}</td>
      <td><button class="btn btn-sm btn-danger" @click="hapusItem(index)">X</button></td>
    </tr>

  </tbody>
</table>
  </div>

</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
data() {
  return {
    title : "Pembelian Produk",
    inputNamaProduk : "",
    data_produk_search : [],
    item : [],
    inputHrg : "",
    pilihan : "Koperasi Banat",
    faktur : "",
    total : 0,
    display : false,
    metode_pembayaran : "",
    cash : 0,
    kembalian : 0,
    nowallet : 0,
    data_wallet : {},

  };
},
methods: {
      async proses_input() {
        console.log(this.inputNamaProduk)  
      const response = await fetch(`https://paymentbe.citra-nusantara.or.id/home/barcode/jual/${this.inputNamaProduk}`);
      const data = await response.json();
      data.data.subtotal = (data.data.harga_jual  * data.data.jumlah) - (data.data.harga_jual  * (data.data.diskon / 100))
      console.log(data)

      this.item.push(data.data);
      this.total = this.sumStok(this.item)
      this.inputNamaProduk = ""
  },
  kembalianChange(){
    console.log(this.cash)
    this.kembalian = this.cash - this.total
  },
  async cariWallet(){
    const response = await fetch(`https://payment.citra-nusantara.or.id/be/wallet/cariWallet/${this.nowallet}`);
    const data = await response.json();
    this.data_wallet = data
    this.cash = this.data_wallet.saldo
    this.kembalian = this.cash - this.total
    console.log(this.data_wallet)
  },
  tambahItem(index) {
         const data = this.data_produk_search[index]
           this.item.push(
              {
                  barcode : data.barcode,
                  nama_produk : data.name,
                  qty : 1,
                  inputQty : 1,
                  harga_pokok : data.cost
              }
           )
           console.log(data)

           this.inputNamaProduk = ""
           this.data_produk_search = []
      },
      hapusItem(index) {
        console.log(index)
        console.log(this.item[index])
        this.total = this.total - this.item[index].subtotal
          this.item.splice(index, 1);
      },
      ubahQty(index) {
          //this.item[index].qty = this.item[index].inputQty
          const subtotal = (this.item[index].harga_jual * this.item[index].jumlah) - ((this.item[index].harga_jual * this.item[index].jumlah) * (this.item[index].diskon / 100))
          this.item[index].subtotal = subtotal
          this.total = this.sumStok(this.item)
          console.log(this.item[index]);
      },
      applyDiskon(index) {
        const subtotal = (this.item[index].harga_jual * this.item[index].jumlah) - ((this.item[index].harga_jual * this.item[index].jumlah) * (this.item[index].diskon / 100))
           this.item[index].subtotal = subtotal
          this.total = this.sumStok(this.item)
          console.log(this.item[index]);
      },
      ubahHrg(index) {
          this.item[index].harga_pokok = this.item[index].inputHrg
          console.log(this.item[index]);
      },
      sumStok(data) {
    return data.reduce((total, item) => total + item.subtotal, 0);
  },
  async bayarProceed(){
    if (this.kembalian < 0) {
          alert('Bayar Tidak Pas!');
}else{
  console.log(this.item);
    console.log(this.metode_pembayaran);
    console.log(this.total);
    console.log(JSON.stringify(this.item))
          const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/produk/jual/cash', {
            log: JSON.stringify(this.item),
            metode_pembayaran : this.metode_pembayaran,
            koperasi : this.pilihan,
            no_wallet : this.nowallet,
            total : this.total,
            oleh : Cookies.get("token")
          });
          alert("berhasil dibayar");
          this.display = false
          this.total = 0
          this.item = [];
}
    
  },
  open(metode){
    this.metode_pembayaran = metode
    this.display = true
  },
      async orders() {
        console.log(JSON.stringify(this.item))
          const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/logic', {
            log: JSON.stringify(this.item),
            faktur : this.faktur,
            koperasi : this.pilihan
          });
          alert("berhasil ditambahkan");
          this.item = [];
          this.faktur = "";
          console.log(response);
      },
},
created() {
    this.$nextTick(() => {
      this.$refs.myInput.focus(); // Fokus pada elemen input saat halaman dibuat
    });
  }
};
</script>
