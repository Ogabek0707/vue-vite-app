<template>
      <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false" class="     
            fixed inset-0 z-0 transition-opacity
            opacity-50 lg:hidden"
      style="background: rgba(0, 16.81, 19.13, 0.50)"></div>
      <div 
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-[222px] fixed left-0 bg-global1 
            z-20 overflow-y-auto inset-y-0
            transition duration-300 transform 
            lg:translate-x-0 lg:static">
            <div class="mt-[60px] border-t-2 border-[white]">
            <router-link v-for="(item,index) in AdminMenu" :key="index" :to="item.path" class=" flex w-full gap-[15px] pl-[30px] py-[15px] bg-[#F5FCCD] ">
                  <SvgIcon type="mdi" :path="item.icon"/>
                  <span >{{ item.label }}</span>
            </router-link>
            </div>
      </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { AdminMenu } from '../menu/AdminMenu'
import { UseSidebar } from '../../hooks/UseSidebar'

const {isOpen} = UseSidebar()
</script>

<style scoped>

</style>