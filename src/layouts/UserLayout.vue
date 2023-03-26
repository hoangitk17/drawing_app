<template>
    <v-layout class="user-layout">
      <Header />
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
</template>

<script setup>
import Header from "@/components/layout/user/Header.vue";
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
