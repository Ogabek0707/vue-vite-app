import axiosClient from "../ApiClient";

const adminGroups = {
      getGroup(params){
            const url = `groups/all/q?page=${params.page}&limit=${params.limit}`
            return axiosClient.get(url)
      },
      createGroup(payload){
            const url = "rooms/create-room"
            return axiosClient.post(url, payload)
      },
      updateGroup(payload,id){
            const url = `rooms/update/${id}`
            return axiosClient.put(url, payload)
      },
      deleteGroup(id){
            const url = `rooms/delete/${id}`
            return axiosClient.delete(url)
      },
}
export default adminGroups