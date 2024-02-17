<template>
      <AppModal v-model="dialog">
            <vee-form :validation-schema="schema" @submit="send" :initial-values="forms">
            <h1 v-if="forms.phone" class="text-global1 font-[600] text-center text-[35px] mt-[5px] mb-[10px]">Edit Student</h1>
            <h1 v-else class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Create Student</h1>
                  <VInput type="text" label="First Name" name="first_name" placeholder="Name" class="w-[70%] ml-[15%]"></VInput>
                  <VInput type="text" label="Last Name" name="last_name" placeholder="Name" class="w-[70%] ml-[15%] mt-[10px]"></VInput>
                  <VInput type="text" label="Phone number" name="phone" mask="+998-##-###-##-##" placeholder="(+998)-93-893-67-07" class="w-[70%] ml-[15%] mt-[10px]"></VInput>
                  <VButton type="submit" btn_type="primary" :isLoading="loading" class="w-[70%] ml-[15%] text-[18px] font-[500] mt-[20px] mb-[25px]">{{ btn_title }}</VButton>
            </vee-form>
      </AppModal>
      <AppModal v-model="dialog2" class="bg-white">
            <VDelete class="font-[600]" v-model="dialog2" :deleteUser="DeleteS"/>
      </AppModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppModal from '../../../components/ui/app-modal.vue'
import VInput from '../../../components/form/VInput.vue'
import VButton from '../../../components/form/VButton.vue'
import VDelete from '../../../components/form/VDelete.vue'
import { useStudentStore } from '../../../stores/admin/student'

const store  = useStudentStore()
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref()
const loading = ref(false)
let forms = ref({
      first_name: "",
      last_name: "",
      phone: ""
})
const openModal = (item) => {
      if(item) forms.value = {...item}
      dialog.value = true
}
const schema = computed(()=>{
      return {
            first_name: 'required|min:3|max:15',
            last_name: 'required|min:3|max:15',
            phone: 'required|min:3|max:20'
      }
})
const btn_title = computed(()=>{
      if(loading.value) {
            return "Loading"
      }else {
            if(forms.value.phone){
                  return "Edit"
            }else{
                  return "Add"
            }
      }
})
const btn_title2 = computed(()=>{
      if(loading.value) {
            return "Deleted"
      }else {
            return "Delete"
      }
})
const send = async (values) => {
      loading.value = true
      if(!forms.value.phone){
            let a = values.phone.split('')
            let b = a.filter(item => !isNaN(+item))
            let c = "+" + b.join('')
            let payload = {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  phone: c,
            }
            await store.createStudent(payload)
      }else{
            let id = values.id
            let d = values.phone.split('')
            let f = d.filter(item => !isNaN(+item))
            let j = "+" + f.join('')
            let payload = {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  phone: j,
            }
            await store.updateStudent(payload,id)
            dialog.value = false
      }
      loading.value = false
}
watch(dialog, (value)=>{
      if(!value){
            forms.value = {}
      }
})
const openModalDelete = (item) =>{
      id.value = item
      dialog2.value = true
}
const DeleteS = async () => {
      await store.deleteStudent(id.value)
}
defineExpose({openModal,openModalDelete})

</script>

<style lang="scss" scoped>

</style>

