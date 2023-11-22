<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="https://puldapii.or.id/APSI/assets/img/Lembaga/Logo/3f9d4a0fba0b9f3d7f9312fc053b81ec.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">WAFI MART</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="username" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center"></div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="login"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
<script>
import Cookies from 'js-cookie';
import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            console.log(this.username);
            console.log(this.password);

            try {
                // Lakukan panggilan API untuk autentikasi
                const response = await axios.post('https://paymentbe.citra-nusantara.or.id/api/login_wafi_mart', {
                    username: this.username,
                    password: this.password
                });

                console.log(response.data);
                // Contoh response dari API dengan data token
                if (response.data.info === 'password benar') {
                    const token = response.data.username;
                    const peran = response.data.role;

                    // Simpan token ke cookies
                    Cookies.set('token', token);
                    Cookies.set('peran', peran);
                    const response2 = await axios.post('https://paymentbe.citra-nusantara.or.id/api/catat_absen_pertama', {
                        username: this.username,
                        password: this.password
                    });
                    // Redirect ke halaman setelah login
                    this.$router.push('/');
                } else {
                    // Lakukan sesuatu jika 'nama' tidak sama dengan 'this.username'
                    alert('password salah');
                    this.username = '';
                    this.password = '';
                }
            } catch (error) {
                // Handle error, misalnya tampilkan pesan kesalahan
                console.error('Login failed', error);
            }
        }
    }
};
</script>
