import { defineStore } from 'pinia'
import Notification from '@/plugins/Notification'
import adminRooms from '../../api/admin/AdminRooms'


export const useRoomStore = defineStore({
      id: "course",
      state:()=>({
            rooms: [],
      }),
      actions: {
            async getRoom(params){
                 try{
                        let res = await adminRooms.getRoom(params)
                        this.rooms = res.rooms
                        params.last_page = Math.ceil(res.count / params.limit)
                 }catch(err){
                  console.log(err);
                 }
            },
            async createRoom(payload){
                  try{
                        let res = await adminRooms.createRoom(payload)
                        if(res?.room){
                              Notification({text: "Added Room !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async updateRoom(payload,id){
                  try{
                        let res = await adminRooms.updateRoom(payload,id)
                        if(res?.updated){
                              Notification({text: "Edited Room !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async deleteRoom(id){
                  try{
                        let res = await adminRooms.deleteRoom(id)
                        console.log(res);
                        if(res?.message){
                              Notification({text: "Deleted Room !!!"}, {type: "danger"})
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