import axios from "../helper/axios.js";

const backendService1 = import.meta.env.VITE_APP_SERVICE_2

export const votingAPI = {
    addVoter: (payload) => {
        return axios.post(`${backendService1}voters`, payload)
    },
    checkVoter: (vid) => {
        return axios.get(`${backendService1}voters/${vid}`)
            .then(response => ({ data: { exists: response.status === 200 } }))
            .catch(() => ({ data: { exists: false } }));
    }
}
