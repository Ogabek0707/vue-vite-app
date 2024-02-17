<template>
      <div class="h-[60px] bg-global1 w-full border-l-2 border-[white]">
            <button class="p-[10px] lg:hidden bg-[red]" @click="isOpen = true">Open Sidebar</button>
      </div>
</template>

<script setup>
import { UseSidebar } from '../../hooks/UseSidebar'

const  {isOpen}  = UseSidebar()
</script>

<style scoped>

</style>