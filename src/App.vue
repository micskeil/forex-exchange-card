<template>
    <main class="main">
        <div class="header">
            <h1 class="header--title">Forex Exchange</h1>
            <h3 class="header--subtitle">
                Checkout the current price on different exchanges for a currency pair
            </h3>
        </div>
        <div class="forex-exchange">
            <ForexMain />
        </div>
    </main>
</template>

<script setup>
    import ForexMain from './components/ForexMain.vue'
</script>


<style lang="postcss">
body {
    @apply flex flex-row font-sans justify-center align-middle bg-gray-100 h-screen w-screen;
}
#app {
    @apply container mx-auto grid place-items-center;
}
</style>

<style lang="postcss" scoped>
    .main {
        @apply container flex flex-col; 
    }

    .header {
        @apply mx-2 md:mx-4 lg:mx-16;
    }

    .header--title {
        @apply text-7xl font-bold;
    }

    .header--subtitle {
        @apply text-xl font-bold text-gray-500 mt-2;
    }

    .forex-exchange {
        @apply h-full flex mt-2 md:mt-8 lg:mt-16 mx-2 md:mx-4 lg:mx-16;    
    }
    
</style>

