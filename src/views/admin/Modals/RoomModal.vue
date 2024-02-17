<template>
      <AppModal v-model="dialog">
            <vee-form :validation-schema="schema" @submit="send" :initial-values="forms">
            <h1 v-if="forms.name" class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Edit Room</h1>
            <h1 v-else class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Create Room</h1>
                  <VInput type="text" label="Room Name" name="name" placeholder="Name" class="w-[70%] ml-[15%]"></VInput>
                  <VInput type="number" label="Room Size" name="size" placeholder="5 +" class="w-[70%] ml-[15%] mt-[10px]"></VInput>
                  <VButton type="submit" btn_type="primary" :isLoading="loading" class="w-[70%] ml-[15%] mt-[20px] mb-[25px]">{{ btn_title }}</VButton>
            </vee-form>
      </AppModal>
      <AppModal v-model="dialog2">
            <VDelete v-model="dialog2" :deleteUser="DeleteS"/>
      </AppModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppModal from '../../../components/ui/app-modal.vue'
import VInput from '../../../components/form/VInput.vue'
import VButton from '../../../components/form/VButton.vue'
import VDelete from '../../../components/form/VDelete.vue'
import { useRoomStore } from '../../../stores/admin/rooms'

const store  = useRoomStore()
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref()
const loading = ref(false)
let forms = ref({
      name: "",
      size: null
})
const openModal = (item) => {
      if(item) forms.value = {...item}
      dialog.value = true
}
const schema = computed(()=>{
      return {
            name: 'required|min:3|max:20',
            size: 'required|min:1|max:3',
      }
})
const btn_title = computed(()=>{
      if(loading.value) {
            return "Loading"
      }else {
            if(forms.value.name){
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
      if(!forms.value.name){
            await store.createRoom(values)
      }else{
            id.value = values._id
            let payload = {
                  name: values.name,
                  size: values.size,
            }
            await store.updateRoom(payload,id.value)
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
      await store.deleteRoom(id.value)
}
defineExpose({openModal,openModalDelete})

</script>

<style lang="scss" scoped>
.app-modal__body {
      padding: 20px;
      .modal {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
       h1 {
            text-align: center;
            margin: 10px 0;
            font-size: 25px;
            font-weight: 500;
      }
      .modal_act{
            margin-top: 30px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            button {
                  padding: 15px 50px;
                  border: none;
                  border-radius: 5px;
                  font-size: 18px;
                  color: #fff;
                  cursor: pointer;
            }
            .btn1 {
                  background-color: #57caeb;
                  font-weight: 500;
            }
            .btn2 {
                  background-color: #ff7976;
                  font-weight: 500;
            }
      }
    }
}
</style>

