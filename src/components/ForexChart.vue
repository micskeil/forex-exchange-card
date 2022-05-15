<template>
  <div class="chart-container w-max-full flex ">
    <Line
      ref="chart"
      :key="chartkey"
      :chart-data="chartData"
      :chart-options="chartOptions"
      :css-classes="'w-full flex-1 w-max-full'"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler
)


const props = defineProps({
    graphData: {
        default: null,
        type: Object,
    },
});

const chartkey = ref(0);
let gradient = ref(null);
let incrementChartKey;

// We have to rerender the chart for resize
// TODO: find a charjs way to do it and not trigger a rerender with key change
onMounted(() => {
    incrementChartKey = () => {
        chartkey.value++;
    }
    window.addEventListener('resize', incrementChartKey);

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    gradient.value = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.value.addColorStop(0, '#e4fac0');   
    gradient.value.addColorStop(1, 'rgba(255,255,255,1)');
});

// Delete the eventListener onUnmounted
onUnmounted(() => {
    window.removeEventListener('resize', incrementChartKey);
});


const chartData = computed(() => {
    return {
        labels: props.graphData,
        datasets: [ {
                data: props.graphData,
                borderColor: "#87c81e",
                backgroundColor: gradient.value,
                fill: true,
                
            }
        ]}
});


const chartOptions = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3,
        interaction: {
            intersect: false,
        },
        animations: {
            tension: {
                duration: 2000,
                easing: 'linear',
                from: 1,
                to: 0
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            filler: {
                propagate: false,
            },
        }, 
        scales: {
            y: {
                display: false,
            },
            x: {
                display: false,
            }
        }, 
        elements: {
            point: {
                radius: 0,
                borderWidth: 0,
            },
            line: {
                fill: "start"
            }
        }
    }
});      
</script>
