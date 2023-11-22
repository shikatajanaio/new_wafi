<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>
    <div class="layout-footer">
        <img src="https://puldapii.or.id/APSI/assets/img/Lembaga/Logo/3f9d4a0fba0b9f3d7f9312fc053b81ec.png" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">Al-Wafi IT</span>
    </div>
</template>
<style lang="scss" scoped></style>
