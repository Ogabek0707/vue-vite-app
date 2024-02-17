<template>
      <div class="flex flex-col">
            <label :for="name" class="text-global1 font-[500] text-[20px] ml-4 block">{{ label }}</label>
            <vee-field v-if="mask" :type="type" masked="true" v-mask="mask" :name="name" :placeholder="placeholder" class="p-[15px] text-[17px] outline-none bg-white rounded-[10px] mt-1.5 border-[2px] border-global1"/>
            <vee-field v-else :type="type" masked="true" :name="name" :placeholder="placeholder" class="p-[15px] text-[17px] outline-none bg-white rounded-[10px] mt-1.5  border-[2px] border-global1"/>
            <ErrorMessage :name="name" class="text-error_color mt-2 ml-4 text-[17px] font-medium"/>
      </div>
</template>

<script setup>
const props = defineProps({
      type:{
            type: String,
            default: 'text'
      },
      name:{
            type: String
      },
      label:{
            type: String
      },
      placeholder:{
            type: String
      },
      mask:{
            type: String
      }
})
</script>

<style lang="scss" scoped>

</style>