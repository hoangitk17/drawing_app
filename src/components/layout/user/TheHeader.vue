<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="text-left">Drawing Easy</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
let drawer = ref(false);
let group = ref(null);
const items = reactive([
  {
    title: "Ghi chú hình",
    value: "foo",
  },
]);

watch(group, () => {
  drawer.value = false;
});
</script>

<style></style>
