<script lang="ts" setup>
definePageMeta({
  title: "Roundest (RSC Version)",
  description: "A web app for voting on which Pokemon is the most round",
});
const fetching = ref(false);
async function vote(winner: Pokemon, index: number) {
  fetching.value = true;
  console.log("voted for", winner.name);
  const loser = twoPokemon.value![index === 0 ? 1 : 0];
  $fetch("/recordBattle", {
    method: "POST",
    body: { winner: winner.dexNumber, loser: loser!.dexNumber },
  }).finally(() => {
    fetching.value = false;
    refreshNuxtData();
  });
}
const { data: twoPokemon, status } = useLazyFetch("/getTwoRandomPokemon");
</script>

<template>
  <div class="container mx-auto px-4">
    <template v-if="status === 'idle'">
      <div class="flex justify-center gap-16 items-center min-h-[80vh]">
        LOADING!!!
        <div
          v-for="i of [1, 2]"
          :key="i"
          class="flex flex-col items-center gap-4"
        >
          <div class="w-64 h-64 bg-gray-800/10 rounded-lg animate-pulse" />
          <div
            class="text-center space-y-2 flex flex-col items-center justify-center"
          >
            <div class="h-6 w-16 bg-gray-800/10 rounded animate-pulse" />
            <div class="h-8 w-32 bg-gray-800/10 rounded animate-pulse" />
            <div class="h-12 w-24 bg-gray-800/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </template>
    <div class="flex justify-center gap-16 items-center min-h-[80vh]">
      <div
        v-for="(pokemon, index) of twoPokemon"
        :key="pokemon.dexNumber"
        class="flex flex-col items-center gap-4"
      >
        <PokemonSprite :pokemon class="w-64 h-64" />
        <div class="text-center">
          <span class="text-gray-500 text-lg">#{{ pokemon.dexNumber }}</span>
          <h2 class="text-2xl font-bold capitalize">
            {{ pokemon.name }}
          </h2>
          <form @submit.prevent="vote(pokemon, index)" class="mt-4">
            <button
              :disabled="fetching"
              class="px-8 py-3 bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              Vote
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>