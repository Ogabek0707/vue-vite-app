<template>
      <div class="w-full flex h-screen">
            <TheSidebarVue/>
            <div class="w-full flex flex-col">
                  <TheHeaderVue/>
                  <router-view></router-view>
            </div>
      </div>
</template>

<script setup>
import TheHeaderVue from "../components/header/TheHeader.vue";
import TheSidebarVue from "../components/header/TheSidebar.vue";

</script>

<style scoped>

</style>