<template>
      <div>
            <StudentModal ref="student_modal"/>
            <div class="mt-2.5 mr-6 flex justify-end">
                  <VButton type='submit' btn_type="primary" @click="openModal" class="font-[500]">Add Student</VButton>
            </div>
            <AppTable :headers="headers" :body="store?.students">
                  <template #body_action="{item}">
                        <VActions :item="item" :modal_value="student_modal"/>
                  </template>
            </AppTable>
            <div class="pagination">
                <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getStudents"/>
            </div>
      </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStudentStore } from '../../stores/admin/student'
import StudentModal from './Modals/StudentModal.vue'
import VButton from '../../components/form/VButton.vue'
import AppTable from '../../components/ui/app-table.vue'
import AppModal from '../../components/ui/app-modal.vue'
import VPagination from "@hennge/vue3-pagination"
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VActions from '../../components/form/VActions.vue'

const student_modal = ref('')
const dialog = ref(false)
const store = useStudentStore()
const params = {
    page: 1,
    limit: 10,
    last_page: null,
}
const headers = ref([
    {title: "First Name", value: "first_name"},
    {title: "Last Name", value: "last_name"},
    {title: "Phone Number", value: "phone"},
    {title: "Action", value: "action"},
])
const openModal = () =>{
      student_modal.value.openModal()
}
const openModalEdit = (item) =>{
      student_modal.value.openModal(item)
}
const openModalDelete = (id) =>{
      student_modal.value.openModalDelete(id)
}
const getStudents =()=>{
      store.getStudents(params)
}
onMounted(()=>{
      store.getStudents(params)
});
</script>

<style lang="scss" scoped>
.pagination {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
}
</style>