import { defineStore } from 'pinia'
import Notification from '@/plugins/Notification'
import adminCourses from '../../api/admin/AdminCourses'


export const useCourseStore = defineStore({
      id: "course",
      state:()=>({
            courses: [],
      }),
      actions: {
            async getCourse(params){
                 try{
                        let res = await adminCourses.getCourse(params)
                        this.courses = res.courses
                        params.last_page = Math.ceil(res.count / params.limit)
                 }catch(err){
                  console.log(err);
                 }
            },
            async createCourse(payload){
                  try{
                        let res = await adminCourses.createCourse(payload)
                        console.log(res);
                        if(res?.course){
                              Notification({text: "Added Course !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async updateCourse(payload,id){
                  try{
                        let res = await adminCourses.updateCourse(payload,id)
                        console.log(res);
                        if(res?.updated){
                              Notification({text: "Edited Course !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async deleteCourse(id){
                  try{
                        let res = await adminCourses.deleteCourse(id)
                        if(res?.message){
                              Notification({text: "Deleted Course !!!"}, {type: "danger"})
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