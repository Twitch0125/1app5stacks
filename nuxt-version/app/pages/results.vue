<script lang="ts" setup>
definePageMeta({
  title: "Results | Roundest (RSC Version)",
  description: "See the results",
});
const { data: rankings, status } = await useLazyFetch("/getRankings");
</script>

<template>
  <div class="container mx-auto px-4 py-8 text-white">
    <div class="grid gap-4">
        <template v-if="status === 'idle'">
          <div class="grid gap-4">
            <div
              v-for="(_, i) of Array(10)"
              :key="i"
              class="flex items-center gap-6 p-6 bg-gray-800/40 rounded-lg shadow animate-pulse"
            >
              <div class="w-8 h-8 bg-gray-700/40 rounded" />
              <div class="w-20 h-20 bg-gray-700/40 rounded" />
              <div class="flex-grow">
                <div class="w-16 h-4 bg-gray-700/40 rounded mb-2" />
                <div class="w-32 h-6 bg-gray-700/40 rounded" />
              </div>
              <div class="text-right">
                <div class="w-16 h-8 bg-gray-700/40 rounded mb-2" />
                <div class="w-24 h-4 bg-gray-700/40 rounded" />
              </div>
            </div>
          </div>
        </template>
        <div v-else class="contents" key="results">
          <div
            v-for="(pokemon, index) of rankings"
            :key="pokemon.dexNumber"
            class="flex items-center gap-6 p-6 bg-gray-800/40 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div class="text-2xl font-bold text-gray-400 w-8">
              #{{ index + 1 }}
            </div>

            <PokemonSprite :pokemon class="w-20 h-20" lazy />

            <div class="flex-grow">
              <div class="text-gray-400 text-sm">#{{ pokemon.dexNumber }}</div>
              <h2 class="text-xl font-semibold capitalize">
                {{ pokemon.name }}
              </h2>
            </div>

            <div class="text-right">
              <div class="text-2xl font-bold text-emerald-400">
                {{ (pokemon.stats.winRate * 100).toFixed(1) }}%
              </div>
              <div class="text-sm text-gray-400">
                {{ pokemon.stats.wins }}W - {{ pokemon.stats.losses }}L
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
