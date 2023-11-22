import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Cookies from 'js-cookie';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/home/riwayat/penjualan/hari_ini',
                    name: 'supervisor_penjualan_hari_ini',
                    component: () => import('@/views/uikit/penjualan/SupervisorPenjualanHariIni.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/wallet/riwayat_topup_hari_ini',
                    name: 'riwayat_topup_hari_ini',
                    component: () => import('@/views/uikit/wallet/RiwayatTopUpHariIni.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/wallet/riwayat_topup',
                    name: 'riwayat_topup',
                    component: () => import('@/views/uikit/wallet/RiwayatTopUp.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/riwayat/penjualan/riwayat',
                    name: 'supervisor_riwayat_penjualan',
                    component: () => import('@/views/uikit/penjualan/SupervisorRiwayat.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/riwayat/penjualan/statistik',
                    name: 'supervisor_statistik_penjualan',
                    component: () => import('@/views/uikit/penjualan/SupervisorStatistik.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/gudang/transfer',
                    name: 'transfer_gudang',
                    component: () => import('@/views/uikit/TransferGudang.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/wallet/topup_wallet',
                    name: 'top_up_wallet',
                    component: () => import('@/views/uikit/topUpWallet.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/penjualan_hari_ini',
                    name: 'penjualan_hari_ini',
                    component: () => import('@/views/uikit/PenjualanHariIni.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/kasir/riwayat_penjualan',
                    name: 'kasir_riwayat_penjualan',
                    component: () => import('@/views/uikit/kasirRiwayatPenjualan.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/gudang/riwayat',
                    name: 'transfer_riwayat',
                    component: () => import('@/views/uikit/TransferGudangRiwayat.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/kategori',
                    name: 'kategori',
                    component: () => import('@/views/uikit/Kategori.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/merk',
                    name: 'merk',
                    component: () => import('@/views/uikit/Merk.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/satuan',
                    name: 'satuan',
                    component: () => import('@/views/uikit/Satuan.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/cabang',
                    name: 'cabang',
                    component: () => import('@/views/uikit/Cabang.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/produk',
                    name: 'produk',
                    component: () => import('@/views/uikit/Produk.vue'),
                    meta: { requiresAuth: true }
                },

                {
                    path: '/home/tambah_produk',
                    name: 'tambah_produk',
                    component: () => import('@/views/uikit/tambahProduk.vue'),
                    meta: { requiresAuth: true }
                },

                {
                    path: '/home/produk/edit_produk',
                    name: 'edit_produk',
                    component: () => import('@/views/uikit/editProduk.vue'),
                    meta: { requiresAuth: true }
                },

                {
                    path: '/home/produk/hapus_produk',
                    name: 'hapus_produk',
                    component: () => import('@/views/uikit/hapusProduk.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/produk/stok_produk',
                    name: 'stok_produk',
                    component: () => import('@/views/uikit/stokProduk.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/produk/pembelian_produk',
                    name: 'pembelian_produk',
                    component: () => import('@/views/uikit/pembelianProduk.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/produk/riwayat_stok',
                    name: 'riwayat_stok',
                    component: () => import('@/views/uikit/riwayatStok.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/wallet/profile',
                    name: 'profile_wallet',
                    component: () => import('@/views/uikit/profileWallet.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/wallet/transaksi',
                    name: 'transaksi_wallet',
                    component: () => import('@/views/uikit/transaksiEwallet.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/penjualan_banin',
                    name: 'penjualan_banin',
                    component: () => import('@/views/uikit/penjualanBanin.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/penjualan_banat',
                    name: 'penjualan_banat',
                    component: () => import('@/views/uikit/penjualanBanat.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/riwayat/pembelian',
                    name: 'riwayat_pembelian',
                    component: () => import('@/views/uikit/riwayatPembelian.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/home/riwayat/penjualan',
                    name: 'riwayat_penjualan',
                    component: () => import('@/views/uikit/riwayatPenjualan.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/uikit/floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: '/uikit/invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/InvalidState.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Periksa apakah token tersimpan di cookies
        const token = Cookies.get('token');
        if (!token) {
            // Jika tidak ada token, redirect ke halaman login
            next('/auth/login');
        } else {
            // Jika token ada, lanjutkan ke rute yang diminta
            next();
        }
    } else {
        // Untuk rute yang tidak memerlukan autentikasi
        next();
    }
});

export default router;
