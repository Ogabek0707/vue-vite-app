<template>
      <GroupModal ref="group_modal"/>
      <div class="mt-2.5 mr-6 flex justify-end">
            <VButton type='submit' btn_type="primary" @click="openModal" class="font-[500]">Add Group</VButton>
      </div>
      <AppTable :headers="headers" :body="store?.groups">
            <template #body_action="{item}">
                  <VActions :item="item" :modal_value="group_modal"/>
            </template>
            <template #body_days="{item}">
                  <div v-if="item.days" class="flex flex-col">
                        <span>Monday</span>
                        <span>Wednesday</span>
                        <span>Friday</span>
                  </div>
                  <div v-else class="flex flex-col">
                        <span>Tuesday</span>
                        <span>Thursday</span>
                        <span>Saturday</span>
                  </div>
            </template>
            <template #body_start_date="{item}">
                  <span>{{ formatData(item.start_data) }}</span>  
            </template>
            <template #body_course="{item}">
                  <span>{{ item.course.name }}</span>  
            </template>
      </AppTable>
      <div class="pagination">
          <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getGroup"/>
      </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGroupStore } from '../../stores/admin/group'
import GroupModal from './Modals/GroupModal.vue'
import VButton from '../../components/form/VButton.vue'
import AppTable from '../../components/ui/app-table.vue'
import AppModal from '../../components/ui/app-modal.vue'
import VPagination from "@hennge/vue3-pagination"
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import moment from 'moment'
import VActions from '../../components/form/VActions.vue'


const store = useGroupStore()
const group_modal = ref()
const params = {
    page: 1,
    limit: 10,
    last_page: null,
}
const formatData = (data) => {
      return moment(data).format('DD-MM-YYYY')
}
const headers = ref([
      {title: 'Group Name', value: 'name'},
      {title: 'Course Name', value: 'course'},
      {title: 'Start date', value: 'start_date'},
      {title: 'Days', value: 'days'},
      {title: 'Start time', value: 'start_time'},
      {title: 'Status', value: 'status'},
      {title: 'Action', value: 'action'},
])
const openModal = () =>{
      group_modal.value.openModal()
}
const openModalEdit = (item) =>{
      group_modal.value.openModal(item)
}
const openModalDelete = (id) =>{
      group_modal.value.openModalDelete(id)
}
onMounted( () => {
      store.getGroup(params)
});
const getGroup = () => {
      store.getGroup(params)
};

</script>

<style lang="scss" scoped>
.pagination {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
}

.demo-range .el-date-editor {
      margin: 8px;
}
.demo-range .el-range-separator {
      box-sizing: content-box;
}
</style>