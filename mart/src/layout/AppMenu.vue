<script setup>
import { ref } from 'vue';
import Cookies from 'js-cookie';
import AppMenuItem from './AppMenuItem.vue';

const peran = Cookies.get('peran');

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Produk',
        items: [
            { label: 'Kategori', icon: 'pi pi-fw pi-tablet', to: '/home/kategori' },
            { label: 'Merk', icon: 'pi pi-fw pi-bookmark', to: '/home/merk' },
            { label: 'Satuan', icon: 'pi pi-fw pi-bars', to: '/home/satuan' },
            { label: 'Cabang', icon: 'pi pi-fw pi-clone', to: '/home/cabang' },
            { label: 'Produk', icon: 'pi pi-fw pi-file', to: '/home/produk' }
        ]
    },
    {
        label: 'Stok',
        items: [
            { label: 'Riwayat Stok', icon: 'pi pi-fw pi-calendar', to: '/home/produk/riwayat_stok' },
            { label: 'Stok Produk', icon: 'pi pi-fw pi-circle', to: '/home/produk/stok_produk' },
            { label: 'Pembelian Produk', icon: 'pi pi-fw pi-bookmark', to: '/home/produk/pembelian_produk' }
        ]
    },
    {
        label: 'Tansaksi',
        items: [
            { label: 'Penjualan Banin', icon: 'pi pi-fw pi-desktop', to: '/home/penjualan_banin' },
            { label: 'Penjualan Banat', icon: 'pi pi-fw pi-desktop', to: '/home/penjualan_banat' }
        ]
    },
    {
        label: 'Riwayat',
        items: [
            { label: 'Riwayat Pembelian', icon: 'pi pi-fw pi-exclamation-circle', to: '/home/riwayat/pembelian' },
            { label: 'Riwayat Penjualan', icon: 'pi pi-fw pi-exclamation-circle', to: '/home/riwayat/penjualan' }
        ]
    },
    {
        label: 'Transfer Gudang',
        items: [
            { label: 'Transfer Gudang', icon: 'pi pi-fw pi-exclamation-circle', to: '/home/gudang/transfer' },
            { label: 'Riwayat Transfer Gudang', icon: 'pi pi-fw pi-exclamation-circle', to: '/home/gudang/riwayat' }
        ]
    },
    {
        label: 'Riwayat',
        items: [
            {
                label: 'Riwayat Penjualan',
                icon: 'pi pi-fw pi-exclamation-circle',
                items: [
                    { label: 'Penjualan Hari Ini', to: '/home/riwayat/penjualan/hari_ini' },
                    { label: 'Riwayat Penjualan', to: '/home/riwayat/penjualan/riwayat' },
                    { label: 'Statistik', to: '/home/riwayat/penjualan/statistik' }
                ]
            }
        ]
    },
    {
        label: 'Wallet',
        items: [
            { label: 'Top Up Wallet', icon: 'pi pi-fw pi-wallet', to: '/home/wallet/topup_wallet' },
            { label: 'Profile Wallet', icon: 'pi pi-fw pi-wallet', to: '/home/wallet/profile' },
            { label: 'Transaksi E-Wallet', icon: 'pi pi-fw pi-wallet', to: '/home/wallet/transaksi' },
            { label: 'Riwayat TopUp Hari Ini', icon: 'pi pi-fw pi-wallet', to: '/home/wallet/riwayat_topup_hari_ini' },
            { label: 'Riwayat TopUp', icon: 'pi pi-fw pi-wallet', to: '/home/wallet/riwayat_topup' }
        ]
    }
]);

const kasir = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Tansaksi',
        items: [
            { label: 'Penjualan Banin', icon: 'pi pi-fw pi-desktop', to: '/home/penjualan_banin' },
            { label: 'Penjualan Banat', icon: 'pi pi-fw pi-desktop', to: '/home/penjualan_banat' },
            { label: 'Penjualan Hari Ini', icon: 'pi pi-fw pi-book', to: '/home/penjualan_hari_ini' },
            { label: 'Riwayat Penjualan', icon: 'pi pi-fw pi-history', to: '/home/kasir/riwayat_penjualan' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu" v-if="peran === 'supervisor'">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
    <ul class="layout-menu" v-if="peran === 'kasir'">
        <template v-for="(item, i) in kasir" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
