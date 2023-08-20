<template>
  <div>
    <HeaderComponent />
    <div class="container py-10">
      <RouterView />
    </div>
    
  </div>
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
</script>

