<template>
      <div class="w-full flex flex-col">
            <label :for="name" class="text-global1 text-[20px] ml-4">{{ label }}</label>
            <div class="w-full flex justify-between gap-1 items-center">
                  <vee-field :type="active ? 'text' : 'password'" :name="name" :placeholder="placeholder" class="w-[90%] p-[15px] text-[17px] outline-none rounded-s-[10px] mt-1.5 border-[2px] border-global1"/>
                  <button type="button" @click="changeType" class="w-[10%] bg-white p-[18.5px] text-[18.5px] rounded-e-lg mt-1.5 flex items-center justify-center border-[2px] border-global1"><font-awesome-icon :icon="active ? 'eye-slash' : 'eye'" class="text-global1"/></button>
            </div>
            <ErrorMessage :name="name" class="text-error_color mt-2 ml-4 text-[17px] font-medium"/>
      </div>
</template>

<script setup>
import { ref } from "vue"

const active = ref(false)
const props = defineProps({
      name:{
            type: String
      },
      label:{
            type: String
      },
      placeholder:{
            type: String
      },
})
const changeType = (e) => {
      e.preventDefault();
      
      active.value = !active.value
}
</script>

<style lang="scss" scoped>

</style>