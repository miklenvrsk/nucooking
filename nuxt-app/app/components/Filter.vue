<script setup lang="ts">
import type {ListboxItem} from '@nuxt/ui'
import {da} from "#ui/locale";

const {data, status} = await useLazyFetch('http://localhost:1337/api/categories', {
  transform: (data: { label: string; value: string; }) => {
    return data.data.map(item => ({
      label: item.category,
      value: item.category
    }));
  },
});







const items = ref<ListboxItem[]>(data)


</script>

<template>
  <UListbox class="w-full h-full" :filter="{
  placeholder: 'Filter...',
  icon: 'i-lucide-search'
}" :items="items" multiple/>
</template>

