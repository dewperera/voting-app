import axios from "../helper/axios.js";

const backendService1 = import.meta.env.VITE_APP_SERVICE_2


export const votingAPI={
    addVoter:(payload)=>{
           return  axios.post(`${backendService1}voters`,payload)
        }
}