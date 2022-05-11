<template>
    <div class="forex-exchange--control">
        sdsds
    </div>
    <div class="forex-exchange--chart">
        <ForexChart />
    </div>
</template>

<script setup>
import ForexChart from './ForexChart.vue'

</script>

<style lang="postcss" scoped>
    .forex-exchange--control {
        @apply basis-2/6 items-center justify-center bg-red-200;
    }

     .forex-exchange--chart {
        @apply basis-4/6 items-center justify-center;
    }
</style>