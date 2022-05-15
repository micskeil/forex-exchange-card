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
         
          class="card--info--price--rate"
        >
          <span class="card--info--price--rate__currency"> 
            {{ currencies?.[1] }}
          </span> 
          {{ currentPrice }} 
          <div class="card--info--price--rate__currency--update">
            last update: {{ lastUpdate }}
          </div>  
        </div>
        <div
          class="card--info--price--diff" 
          :class="{ 'text-green-500': diff > 0, 'text-red-500': diff < 0 }"
        >
          {{ priceDiff }}
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
import { ref, computed } from 'vue';
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

const lastUpdate = ref(null);

const currencies = computed(() => {
    if(!props.selectedSymbol?.displaySymbol) return;
    return props.selectedSymbol.displaySymbol.split("/")
});

const currentPrice = computed(() => {
    if(!props.graphData) return;
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    lastUpdate.value = new Date().toLocaleTimeString();
    return parseFloat(props.graphData[props.graphData.length - 1]).toFixed(2);
});

const diff = computed(() => {
    if(!props.graphData) return;
    return parseFloat(props.graphData[props.graphData.length - 1] - props.graphData[0]).toFixed(2);
});

const priceDiff = computed(() => {
    if(!props.graphData) return;
    return `${diff.value > 0 ? "+" : ""} ${diff.value} (${diff.value > 0 ? "+" : ""}${parseFloat(diff.value/currentPrice.value*100).toFixed(2)}%)`
});

const flagClasses = computed(() => {
    if(!currencies.value || !currencies.value.length) return;        
    return [`currency-flag-${currencies.value[0].toLowerCase()}`, `currency-flag-${currencies.value[1].toLowerCase()}`];
});


</script>

<style lang="postcss" scoped>
    .card {
        @apply flex flex-col m-2 md:m-4 lg:m-4 rounded-2xl shadow-xl bg-gray-50;

        &--header {
            @apply flex flex-row mt-2 md:mt-4 lg:mt-8 mx-2 md:mx-4;
       
            &--source {
                @apply h-8 lg:h-10 w-fit font-bold text-gray-600 bg-gray-200 rounded-3xl px-4 mx-2 align-middle py-0.5 lg:py-1.5; 
            }
        }

        &--info {
            @apply flex justify-between mx-2 md:mx-4;

            &--currencies {
                @apply font-bold mx-2 my-2 md:my-4 text-lg lg:text-4xl;
            }

            &--price {
                @apply mx-2 my-2 md:my-4 flex flex-col;

                &--rate {
                    @apply text-right font-semibold text-xl lg:text-4xl;

                    &__currency {
                        @apply font-semibold text-base lg:text-xl;

                        &--update {
                            @apply text-xs lg:text-xs font-thin;
                        }
                    }
                }

                &--diff {
                    @apply text-right font-bold text-base lg:text-xl mt-2 lg:mt-4;
                }
            }


        }

    }

    .currency-flag {
        @apply w-8 h-8 lg:w-10 lg:h-10  bg-blue-200 rounded-full  mx-2 bg-center;
    }


    .scale-control { 
        @apply flex flex-row justify-evenly mx-2 md:mx-4 text-base my-2 text-gray-400;
        &--label {
            @apply px-3 py-2 rounded-xl;
            
            &:hover {
                @apply cursor-pointer text-gray-700 bg-gray-200 ;
            }
            &--active {
                @apply text-gray-700 bg-gray-200 font-bold;
            }
        }
    }
    

</style>