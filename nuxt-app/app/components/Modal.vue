<script setup lang="ts">

</script>

<template>
  <template>
    <UModal
      title="Modal with close button"
      :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
    >
      <UButton label="Open" color="neutral" variant="subtle">Account</UButton>

      <template #body>
        <Authform/>
      </template>
    </UModal>
  </template>
</template>

<style scoped>

</style>
