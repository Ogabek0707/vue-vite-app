<template>
      <AppModal v-model="dialog">
      <h1>Group</h1>
      <div class="demo-date-picker">
            <div class="block">
                  <span class="demonstration">Date</span>
                  <el-date-picker v-model="value2" type="date" placeholder="Start a date" @change="handleChangeDate($event)"/>
            </div>
            <div class="demo-range">
                  <el-time-picker v-model="value1" is-range range-separator="To" start-placeholder="Start Time" end-placeholder="End Time" @change="handleChangeTime($event)"/>
            </div>
      </div>
            <!-- <vee-form :validation-schema="schema" @submit="send" :initial-values="forms">
            <h1 v-if="forms.name" class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Edit Room</h1>
            <h1 v-else class="text-global1 text-center text-[35px] mt-[5px] mb-[10px]">Create Room</h1>
                  <VInput type="text" label="Room Name" name="name" placeholder="Name" class="w-[70%] ml-[15%]"></VInput>
                  <VInput type="number" label="Room Size" name="size" placeholder="5 +" class="w-[70%] ml-[15%] mt-[10px]"></VInput>
                  <VButton type="submit" btn_type="primary" :isLoading="loading" class="w-[70%] ml-[15%] mt-[20px] mb-[25px]">{{ btn_title }}</VButton>
            </vee-form> -->
      </AppModal>
      <AppModal v-model="dialog2">
            <VDelete v-model="dialog2" :deleteUser="DeleteS"/>
      </AppModal>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import AppModal from '../../../components/ui/app-modal.vue'
import VInput from '../../../components/form/VInput.vue'
import VButton from '../../../components/form/VButton.vue'
import VDelete from '../../../components/form/VDelete.vue'
import { useGroupStore } from '../../../stores/admin/group'
import moment from 'moment'

const store  = useGroupStore()
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref()
const loading = ref(false)
const values = reactive({
      start_date: "",
      start_time: "",
      end_time: ""
})
const value1 = ref([
      new Date(),
      new Date()
])
const value2 = ref('')
console.log(value2.value);
const handleChangeTime = (e) => {
      let a = e[0].getHours()
      let b = e[0].getMinutes()
      let c = e[1].getHours()
      let d = e[1].getMinutes()
      let start_time = a * 60 + b
      let end_time = c * 60 + d
      let payload = {
            start_date: values.start_date,
            start_time: start_time,
            end_time: end_time
            
      }
      console.log(payload);
}
const handleChangeDate = (e) => {
      values.start_date = moment(e).format('DD-MM-YYYY')
}
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
      await store.deleteGroup(id.value)
}
defineExpose({openModal,openModalDelete})

</script>

<style lang="scss" scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  float: left;
  flex-wrap: wrap;
  .block {
      border-right: solid 1px var(--el-border-color);
      flex: 1;
      .demonstration {
            display: block;
            color: var(--el-text-color-secondary);
            font-size: 14px;
            margin-bottom: 10px;
            margin-left: 10px;
      }
  }
}
</style>

