<template>
      <RoomModal ref="room_modal"/>
      <div class="mt-2.5 mr-6 flex justify-end">
            <VButton type='submit' btn_type="primary" @click="openModal" class="font-[500]">Add Room</VButton>
      </div>
      <AppTable :headers="headers" :body="store?.rooms">
            <template #body_action="{item}">
                  <VActions :item="item" :modal_value="room_modal"/>
            </template>
      </AppTable>
      <div class="pagination">
          <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getRooms"/>
      </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoomStore } from '../../stores/admin/rooms'
import RoomModal from './Modals/RoomModal.vue'
import VButton from '../../components/form/VButton.vue'
import AppTable from '../../components/ui/app-table.vue'
import AppModal from '../../components/ui/app-modal.vue'
import VPagination from "@hennge/vue3-pagination"
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VActions from '../../components/form/VActions.vue'


const store = useRoomStore()
const room_modal = ref()
const params = {
    page: 1,
    limit: 10,
    last_page: null,
}
const headers = ref([
      {title: 'Room Name', value: 'name'},
      {title: 'Room Size', value: 'size'},
      {title: 'Action', value: 'action'}
])
const openModal = () =>{
      room_modal.value.openModal()
}
const openModalEdit = (item) =>{
      room_modal.value.openModal(item)
}
const openModalDelete = (id) =>{
      room_modal.value.openModalDelete(id)
}
onMounted( () => {
      store.getRoom(params)
});
const getRooms = () => {
      store.getRoom(params)
};

</script>

<style lang="scss" scoped>
.pagination {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
}
</style>