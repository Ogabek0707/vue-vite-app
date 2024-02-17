<template>
      <CourseModal ref="course_modal"/>
      <div class="mt-2.5 mr-6 flex justify-end">
            <VButton type='submit' btn_type="primary" @click="openModal" class="font-[500]">Add Course</VButton>
      </div>
      <AppTable :headers="headers" :body="store?.courses">
            <template #body_price="{item}">
                  <span>{{ item.price }} so'm</span>
            </template>
            <template #body_action="{item}">
                  <VActions :item="item" :modal_value="course_modal"/>
            </template>
      </AppTable>
      <div class="pagination">
          <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getCourses"/>
      </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCourseStore } from '../../stores/admin/course'
import CourseModal from './Modals/CourseModal.vue'
import VButton from '../../components/form/VButton.vue'
import AppTable from '../../components/ui/app-table.vue'
import VPagination from "@hennge/vue3-pagination"
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VActions from '../../components/form/VActions.vue'


const store = useCourseStore()
const course_modal = ref('')
const params = {
    page: 1,
    limit: 10,
    last_page: null,
}
const headers = ref([
      {title: 'Course Name', value: 'name'},
      {title: 'Course Price', value: 'price'},
      {title: 'Course Period', value: 'period'},
      {title: 'Action', value: 'action'}
])
const openModal = () =>{
      course_modal.value.openModal()
}
const openModalEdit = (item) =>{
      course_modal.value.openModal(item)
}
const openModalDelete = (id) =>{
      course_modal.value.openModalDelete(id)
}
onMounted( () => {
      store.getCourse(params)
});
const getCourses = () => {
      store.getCourse(params)
};

</script>

<style lang="scss" scoped>
.pagination {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
}
</style>