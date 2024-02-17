<template>
      <AppModal v-model="dialog">
            <vee-form :validation-schema="schema" @submit="send" :initial-values="forms">
            <h1 v-if="forms.period" class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Edit Course</h1>
            <h1 v-else class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Create Course</h1>
                  <VInput type="text" label="Course Name" name="name" placeholder="Name" class="w-[70%] ml-[15%]"></VInput>
                  <VInput type="number" label="Course Price" name="price" placeholder="200 000 +" class="w-[70%] ml-[15%] mt-[10px]"></VInput>
                  <VInput type="number" label="Course Period" name="period" placeholder="30 +" class="w-[70%] ml-[15%] mt-[10px]"></VInput>
                  <VButton type="submit" btn_type="primary" :isLoading="loading" class="w-[70%] ml-[15%] mt-[20px] mb-[25px]">{{ btn_title }}</VButton>
            </vee-form>
      </AppModal>
      <AppModal v-model="dialog2" class="bg-white">
            <VDelete v-model="dialog2" :deleteUser="DeleteS"/>
      </AppModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppModal from '../../../components/ui/app-modal.vue'
import VInput from '../../../components/form/VInput.vue'
import VButton from '../../../components/form/VButton.vue'
import VDelete from '../../../components/form/VDelete.vue'
import { useCourseStore } from '../../../stores/admin/course'

const store  = useCourseStore()
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref()
const loading = ref(false)
let forms = ref({
      name: "",
      price: "",
      period: ""
})
const openModal = (item) => {
      if(item) forms.value = {...item}
      dialog.value = true
}
const schema = computed(()=>{
      return {
            name: 'required|min:3|max:15',
            price: 'required|min:6|max:20',
            period: 'required|min:2|max:10'
      }
})
const btn_title = computed(()=>{
      if(loading.value) {
            return "Loading"
      }else {
            if(forms.value.period){
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
      if(!forms.value.period){
            await store.createCourse(values)
      }else{
            id.value = values._id
            let payload = {
                  name: values.name,
                  price: values.price,
                  period: values.period,
            }
            await store.updateCourse(payload,id.value)
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
      console.log(item);
      dialog2.value = true
}
const DeleteS = async () => {
      await store.deleteCourse(id.value)
}
defineExpose({openModal,openModalDelete})

</script>

<style lang="scss" scoped>
</style>

