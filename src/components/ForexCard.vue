<template>
  <div class="card">
    <div class="card--header">
      <div
        v-if="flagClasses && flagClasses[0]"
        class="currency-flag"
        :class="flagClasses[0]"
      />
      <div
        v-if="flagClasses && flagClasses[1]"
        class="currency-flag"
        :class="flagClasses[1] "
      />
      <h3
        v-if="props.selectedExchange"
        class="card--header--source"
      >
        {{ props.selectedExchange }}
      </h3>
    </div>
    <div class="card--info">
      <div
        v-if="props.selectedSymbol?.displaySymbol"
        class="card--info--currencies"
      >
        {{ props.selectedSymbol.displaySymbol }}
      </div>
      <div class="card--info--price">
        <div
          v-if="currentPrice && !isNaN(currentPrice)"
          class="card--info--price--rate"
        >
          <span class="card--info--price-currency"> 
            {{ currencies[1] }}
          </span> 
          {{ currentPrice }}
        </div>
        <div
          v-if="priceDiff && !isNaN(priceDiff)"
          class="card--info--price--diff" 
          :class="{ 'text-green-500': currentPrice > 0, 'text-red-500': currentPrice < 0 }"
        >
          {{ priceDiff > 0 ? "+" : "" }} {{ priceDiff }} ({{ priceDiff > 0 ? "+" : "" }}{{ parseFloat(priceDiff/currentPrice*100).toFixed(2) }}%)
        </div>
      </div>
    </div>
    <ForexChart
      v-if="props.graphData"
      :graph-data="props.graphData"
      class="w-max-full"
    />
    <div class="scale-control">
      <div
        v-for="scale in Object.keys(scales)"
        :key="scale"
        class="scale-control--label"
        :class="{ 'scale-control--label--active': scale === props.selectedScale }"
        @click="$emit('scaleChanged', scale)"
      >
        {{ scale }}
      </div>
    </div>    
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ForexChart from './ForexChart.vue';
import { scales } from "./composables/fetchApi.js";

const props = defineProps({
    selectedExchange: {
        default: null,
        type: String,
    }, 
    selectedSymbol: {
        default: null,
        type: Object,
    },
    graphData: {
        default: null,
        type: Object,
    }, 
    selectedScale: {
        default: "1M",
        type: String,
    },
});

defineEmits({
    scaleChanged: {
        type: String,
    }
});

const currencies = computed(() => {
    if(!props.selectedSymbol?.displaySymbol) return;
    return props.selectedSymbol.displaySymbol.split("/")
});

const currentPrice = computed(() => {
    if(!props.graphData) return;
    return parseFloat(props.graphData[props.graphData.length - 1]).toFixed(2);
});

const priceDiff = computed(() => {
    if(!props.graphData) return;
    return parseFloat(props.graphData[props.graphData.length - 1] - props.graphData[0]).toFixed(2);
});

const flagClasses = computed(() => {
    if(!currencies.value || !currencies.value.length) return;        
    return [`currency-flag-${currencies.value[0].toLowerCase()}`, `currency-flag-${currencies.value[1].toLowerCase()}`];
});
</script>

<style lang="postcss" scoped>
    .card {
        @apply flex flex-col m-2 md:m-4 lg:m-4 rounded-2xl shadow-xl;
    }
    .card--header {
        @apply flex flex-row mt-2 md:mt-4 lg:mt-8 mx-2 md:mx-4; 
    }

    .currency-flag {
        @apply w-8 h-8 lg:w-10 lg:h-10  bg-blue-200 rounded-full  mx-2 bg-center;
    }

    .card--header--source {
        @apply h-8 lg:h-10 w-fit font-bold text-gray-600 bg-gray-200 rounded-3xl px-4 mx-2 align-middle py-0.5 lg:py-1.5; 
    }

    .card--info {
        @apply flex justify-between mx-2 md:mx-4;
    }

    .card--info--currencies {
        @apply font-bold mx-2 my-2 md:my-4 text-lg lg:text-4xl;
    }
    .card--info--price {
        @apply mx-2 my-2 md:my-4 flex flex-col; 
    }

    .card--info--price--rate {
        @apply text-right font-semibold text-xl lg:text-4xl;
    }
    .card--info--price-currency {
        @apply font-semibold text-base lg:text-xl;
    }

    .card--info--price--diff {
        @apply text-right font-bold text-base lg:text-xl mt-2 lg:mt-4;
    }

    .scale-control { 
        @apply flex flex-row justify-evenly mx-2 md:mx-4 text-base my-2 text-gray-400;
        &--label {
            @apply px-3 py-2 rounded-xl;
            
            &:hover {
                @apply cursor-pointer text-gray-700 bg-gray-200 ;
            }
            &--active {
                @apply text-gray-700 bg-gray-200;
            }
        }
    }
    

</style>