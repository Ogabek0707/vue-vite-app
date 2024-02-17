import { defineStore } from 'pinia'
import Notification from '@/plugins/Notification'
import adminGroup from '../../api/admin/AdminGroup'


export const useGroupStore = defineStore({
      id: "group",
      state:()=>({
            groups: [],
      }),
      actions: {
            async getGroup(params){
                 try{
                        let res = await adminGroup.getGroup(params)
                        this.groups = res.groups
                        params.last_page = Math.ceil(res.count / params.limit)
                 }catch(err){
                  console.log(err);
                 }
            },
            async createGroup(payload){
                  try{
                        let res = await adminGroup.createGroup(payload)
                        if(res?.group){
                              Notification({text: "Added Group !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async updateGroup(payload,id){
                  try{
                        let res = await adminGroup.updateGroup(payload,id)
                        if(res?.updated){
                              Notification({text: "Edited Group !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async deleteGroup(id){
                  try{
                        let res = await adminGroup.deleteGroup(id)
                        console.log(res);
                        if(res?.message){
                              Notification({text: "Deleted Group !!!"}, {type: "danger"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
      }
})