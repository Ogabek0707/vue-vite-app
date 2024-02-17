<template>
   <div class="w-full h-screen bg-[#E7EdF0] flex items-center justify-center">
      <div class="w-4/5 flex items-center justify-center">
          <div class="w-[60%] flex justify-center flex-col items-center">
            <h1 class="text-global1 mt-[-40px] font-bold text-[44px]">Najot Ta'limga</h1>
            <p class="text-global1 font-normal text-[32px]">Xush kelibsiz!</p>
            <vee-form :validation-schema="schema" class="w-[90%] mt-[70px] flex flex-col gap-[30px]" @submit="send">
                  <div class="w-full">
                        <VInput type="text" label="Phone number" name="phone_number" mask="+998-##-###-##-##" placeholder="(+998)-93-893-67-07"></VInput>
                  </div>
                  <div class="w-full flex justify-between items-center">
                        <VPassword type="password" label="Password" name="password" placeholder="Enter your password"></VPassword>
                  </div>
                  <VButton type="submit" btn_type="primary" :isLoading="loading">{{ btn_title }}</VButton>
            </vee-form>
           </div>
      </div>
   </div>
</template>

<script setup>
import { computed, ref } from "vue";
import VInput from '../../components/form/VInput.vue'
import VPassword from '../../components/form/VPassword.vue'
import VButton from '../../components/form/VButton.vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useAuthStore()
const loading = ref(false)
const schema = computed(()=>{
      return {
            password: 'required|min:3|max:15',
            phone_number: 'required|min:3|max:20'
      }
})
const btn_title = computed(()=>{
      if(loading.value) {
            return "Loading"
      }else {
            return "Kirish"
      }
})
const send = async (value) => {
      // router.push({name: 'Student'})
      loading.value = true
      let a = value.phone_number.split('')
      let b = a.filter(item => !isNaN(+item))
      let c = "+" + b.join('')
      let payload = {
            phone: c,
            password: value.password
      }
      await store.authLogin(payload)
      loading.value = false
}

</script>

<style lang="scss" scoped>

</style>