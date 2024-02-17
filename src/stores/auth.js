import { defineStore } from 'pinia'
import authApi from "../api/auth/AuthApi"
import Notification from '@/plugins/Notification'
import router from '@/router/index'

export const useAuthStore = defineStore({
      id: "auth",
      state:()=>({
            user: null,
            roles:[]
      }),
      actions: {
            async authLogin(payload){
                 try{
                  // this.user = payload
                  let res = await authApi.login(payload)
                  if(res?.tokens?.access_token){
                        console.log(res)
                        localStorage.setItem("role", res?.user?.role)
                        localStorage.setItem("token", res?.tokens?.access_token)
                        if(res?.user?.role == 'admin'){
                              Notification({text: "Select your role !!!"}, {type: "success"})
                             await router.push({name: 'Student'})
                        }
                        else if(res?.user?.role == 'director'){
                              Notification({text: "Select your role !!!"}, {type: "success"})
                             await router.push({name: 'director'})
                        }
                  }
                 }catch(err){
                  Notification({text: "Something Wrong !!!"}, {type: "danger"})
                  console.log(err);
                  // if(err.response.data.roles){
                  //       this.roles = err.response.data.roles
                  // }
                 }
            }
      }
})
