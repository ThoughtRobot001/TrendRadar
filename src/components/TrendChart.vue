<template>
  <div :class="wrapperClass">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const labels = computed(() => props.data.map((_, index) => `Day ${index + 1}`));

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      data: props.data,
      borderColor: '#00c9a7',
      backgroundColor: props.compact ? 'rgba(0,201,167,0.08)' : 'rgba(0,201,167,0.2)',
      tension: 0.4,
      fill: true,
      pointRadius: props.compact ? 0 : 4,
      pointHoverRadius: 6,
      borderWidth: props.compact ? 2 : 3
    }
  ]
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: !props.compact,
      ticks: { color: '#94a3b8' },
      grid: { color: 'rgba(148,163,184,0.1)' }
    },
    y: {
      display: !props.compact,
      ticks: { color: '#94a3b8' },
      grid: { color: 'rgba(148,163,184,0.08)' }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#020617',
      titleColor: '#e2e8f0',
      bodyColor: '#cbd5f5',
      padding: 12,
      displayColors: false
    }
  }
}));

const wrapperClass = computed(() =>
  props.compact ? 'h-24 w-full overflow-hidden rounded-xl bg-white/5 px-2' : 'h-72 w-full'
);
</script>
