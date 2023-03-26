<template>
  <v-layout class="user-layout">
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import TheHeader from "@/components/layout/user/TheHeader.vue";
</script>

<style lang="scss" scoped>
.user-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content-wrapper {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
    padding: 0px 20px;
  }
}
</style>
