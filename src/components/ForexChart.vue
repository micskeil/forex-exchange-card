<template>
    <div class="card">
        <div class="card--header">
            <div class="card--header--flag"></div>
            <div class="card--header--flag"></div>
            <h3 class="card--header--source">Forex.com</h3>
        </div>
        <div class="card--info">
            <div class="card--info--currencies">USD/EUR</div>
            <div class="card--info--price">
                <div class="card--info--price--rate">$113.60</div>
                <div class="card--info--price--diff"> + 4.63 (+3.42%)</div>
            </div>
        </div>
    </div>    
</template>

<style lang="postcss" scoped>
    .card {
        @apply flex flex-col m-2 md:m-4 lg:m-4 rounded-2xl shadow-xl;
        height: 450px;
    }
    .card--header {
        @apply flex flex-row mt-2 md:mt-4 lg:mt-8 mx-2 md:mx-4; 
    }

    .card--header--flag {
        @apply w-8 h-8 lg:w-10 lg:h-10  bg-blue-200 rounded-full  mx-2;
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

    .card--info--price--diff {
        @apply text-right font-bold text-base lg:text-xl mt-2 lg:mt-4 text-green-500;
    }
</style>