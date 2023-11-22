<template>
    <div>
        <div class="card">
            <h5>Data Penjualan Hari Ini</h5>
            <input type="text" v-model="search" placeholder="Search" class="form-control" />
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th @click="sortByID">ID</th>
                        <th>Nama</th>
                        <th>Penjualan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in sortedData" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.sales }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-success" @click="pesan">Pesan</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            sortAscending: true,
            data: [
                { id: 1, name: 'Item 1', sales: 100 },
                { id: 2, name: 'Item 2', sales: 200 },
                { id: 3, name: 'Item 3', sales: 300 }
                // Add more dummy data as needed
            ]
        };
    },
    computed: {
        filteredData() {
            return this.data.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()));
        },
        sortedData() {
            return this.filteredData.sort((a, b) => this.sortAscending ? a.id - b.id : b.id - a.id);
        }
    },
    methods: {
        pesan() {
            alert('Fungsi pesan dipanggil');
        },
        sortByID() {
            this.sortAscending = !this.sortAscending;
        }
    }
};
</script>