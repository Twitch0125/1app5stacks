<template>
  <Html lang="en" />
  <Body
    class="antialiased bg-gray-950 text-white flex flex-col justify-between min-h-screen border-t-2 border-emerald-300"
  />
  <header class="py-4 px-8">
    <div class="flex items-center justify-between">
      <div class="flex items-baseline">
        <NuxtLink to="/" class="font-bold text-3xl">
          round<span class="text-emerald-300">est</span>
          <span class="text-gray-400 font-extralight pl-2 text-2xl">
            (Nuxt)
          </span>
        </NuxtLink>
      </div>
      <nav class="flex flex-row items-center gap-8">
        <NuxtLink href="/results" class="hover:underline text-lg">
          Results
        </NuxtLink>
      </nav>
    </div>
  </header>

  <main class="flex-1">
    <NuxtPage />
  </main>

  <footer class="font-light text-center py-3 text-gray-500">
    <NuxtLink
      to="https://github.com/t3dotgg/1app5stacks"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </NuxtLink>
  </footer>
</template>

<style>

</style>
