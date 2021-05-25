  
import Axios from "axios";

export const getProjectList=()=>{

}

export const storeNewProject=async(data)=>{
     return await Axios.post('http://localhost:8000/api/projects', data)
    .then((res)=>{
        return res.data;
    })
}