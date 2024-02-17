<template>
  <section>
    <!-- <vee-form :validation-schema="schema" @submit="save">
        <VInput type="text" name="username" label="Username" placeholder="Username"></VInput>
        <VInput type="password" name="password" label="Password" placeholder="Password"></VInput>
        <button type="submit" @click="save">Save</button>
    </vee-form> -->
    <!-- <div v-if="store.roles.length > 0 ">
      <select v-model="selected">
        <option :value="item" v-for="(item,index) in store.roles" :key="index">{{ item }}</option>
      </select>
      <button @click="saveForm">Save Form</button>
    </div> -->
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import VInput from "../components/form/VInput.vue"
import { useAuthStore } from '../stores/auth.js'

const store = useAuthStore()
const selected = ref("")
const phone = ref("")
const schema = computed(()=>{
  return {
    username: "required|min:3|max:12",
    password: "required|min:3|max:12"
  }
})
const handleChange = (e) => {
  phone.value = e.target.value
  // console.log(e.target.value);
}
const save = async (values)=>{
  console.log(phone.value);
  // await store.authLogin(values)
};
const saveForm = async () => {
  let payload = {
    current_role: selected.value,
    ...store.user
  }
  await store.authLogin(payload)
}
</script>
