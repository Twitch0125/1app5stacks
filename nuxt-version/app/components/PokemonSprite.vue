<script lang="ts" setup>
defineProps<{
    pokemon: Pokemon;
    lazy?: boolean;
}>();
</script>

<template>
    <img
        :src="`/sprite/${pokemon.dexNumber}.png`"
        :alt="pokemon.name"
        :style="{ imageRendering: 'pixelated' }"
        :loading="lazy ? 'lazy' : 'eager'"
    />
</template>
