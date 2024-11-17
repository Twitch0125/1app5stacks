<script lang="ts" setup>
definePageMeta({
  title: "Results | Roundest (RSC Version)",
  description: "See the results",
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 text-white">
    <div class="grid gap-4">
      <Suspense>
        <template #fallback>
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
        <ResultsPage />
      </Suspense>
    </div>
  </div>
</template>




