<template>
  <div class="forex-exchange--control">
    <div class="forex-exchange--control--exchange">          
      <select
        v-model="selectedExchange"
        class="form-control"
      >
        <option
          v-for="exchange in exchanges"
          :key="exchange"
          :value="exchange"
        >
          {{ exchange }}
        </option>
      </select>         
    </div>
    <div
      v-if="selectedExchange"
      class="forex-exchange--control--symbol"
    >          
      <select
        v-model="selectedSymbol"
        class="form-control"
      >
        <option
          v-for="symbol in symbols"
          :key="symbol"
          :value="symbol"
        >
          {{ symbol.displaySymbol }}
        </option>
      </select>         
    </div>
  </div>
  <div class="forex-exchange--chart">
    <ForexCard
      :selected-exchange="selectedExchange"
      :selected-symbol="selectedSymbol"
      :graph-data="graphData"
      :selected-scale="selectedScale"
      @scale-changed="changeScale"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ForexCard from './ForexCard.vue';

import { getAllExchanges, getAllSymbols, getRates } from './composables/fetchApi.js'

const exchanges = ref([]);
const symbols = ref([]);
const selectedExchange = ref(null);
const selectedSymbol = ref(null);
const graphData = ref([]);
const selectedScale = ref("1M");

async function getExchanges() {
    const allExchanges = await getAllExchanges();
    allExchanges.forEach(element => exchanges.value.push(element));
    selectedExchange.value = exchanges.value[0];
}
getExchanges();

async function reDrawChart() {
    graphData.value = [];
    const fullSymbol = selectedExchange.value + ':' + selectedSymbol.value.displaySymbol.replace("/", "_");
    const data = await getRates(
        fullSymbol, 
        selectedScale.value
    );
    // We add only the closing price here!!
    graphData.value = data.c;
}

function changeScale(event) {
    selectedScale.value = event;
    reDrawChart();
}

watch(selectedExchange, async () => {
    selectedSymbol.value = null;
    graphData.value = [];
    const allSymbols = await getAllSymbols(selectedExchange.value);
    symbols.value = allSymbols;
    selectedSymbol.value = symbols.value[0];
})


watch(selectedSymbol, async () => {
    if(!selectedSymbol.value) return;
    reDrawChart();
})

</script>

<style lang="postcss" scoped>
    .forex-exchange--control {
        @apply basis-2/6 items-center flex flex-row md:flex-col justify-start md:justify-center ml-2 mr-8;
        
        &--exchange {
            @apply md:min-w-full;
        }

        &--symbol {
            @apply md:min-w-full;
        }
    }

    .form-control {
        @apply md:w-full px-2 py-1 md:py-3 md:my-2 rounded-xl border-2 border-gray-200;
    }

     .forex-exchange--chart {
        @apply basis-4/6 items-center justify-center;
    }
</style>