import { defineStore } from 'pinia'
import Notification from '@/plugins/Notification'
import adminStudent from '../../api/admin/AdminStudent'


export const useStudentStore = defineStore({
      id: "student",
      state:()=>({
            students: [],
      }),
      actions: {
            async getStudents(params){
                 try{
                  let res = await adminStudent.getStudents(params)
                  this.students = res.students
                  console.log(res);
                  params.last_page = Math.ceil(res.count / params.limit)
                 }catch(err){
                  console.log(err);
                 }
            },
            async createStudent(payload){
                  try{
                        let res = await adminStudent.createStudent(payload)
                        if(res?.message == 'Success'){
                              Notification({text: "Added Student !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async updateStudent(payload,id){
                  try{
                        let res = await adminStudent.updateStudent(payload,id)
                        if(res?.updated_user){
                              Notification({text: "Edited Student !!!"}, {type: "success"})
                              setTimeout(()=>{
                                    window.location.reload()
                              }, 1500)
                        }
                  }catch(err){
                        Notification({text: "Something Wrong !!!"}, {type: "danger"})
                        console.log(err);
                  }
            },
            async deleteStudent(id){
                  try{
                        let res = await adminStudent.deleteStudent(id)
                        if(res?.message){
                              Notification({text: "Deleted Student !!!"}, {type: "danger"})
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
