<script lang="ts" setup>
const { data: rankings } = await useLazyFetch("/getRankings");
</script>

<template>
  <div class="contents" key="results">
    <div
      v-for="(pokemon, index) of rankings"
      :key="pokemon.dexNumber"
      class="flex items-center gap-6 p-6 bg-gray-800/40 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div class="text-2xl font-bold text-gray-400 w-8">#{{ index + 1 }}</div>

      <PokemonSprite :pokemon class="w-20 h-20" lazy />

      <div class="flex-grow">
        <div class="text-gray-400 text-sm">#{{ pokemon.dexNumber }}</div>
        <h2 class="text-xl font-semibold capitalize">{{ pokemon.name }}</h2>
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
  </template>