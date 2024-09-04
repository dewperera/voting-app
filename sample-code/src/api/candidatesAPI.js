import axios from "axios";

const backendService1 = import.meta.env.VITE_APP_SERVICE_1


export const votingAPI={
    createVote:(payload)=>{
           return  axios.post(`${backendService1}/candidates`,payload)
        }
}