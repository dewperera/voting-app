import axios from "../helper/axios.js";

const backendService1 = import.meta.env.VITE_APP_SERVICE_1;

export const candidatesAPI = {
    createCandidate: (payload) => {
        return axios.post(`${backendService1}candidates`, payload)
    },
    getCandidateById: (cid) => {
        return axios.get(`${backendService1}candidates/${cid}`)
    },
    updateCandidate: (cid, payload) => {
        return axios.put(`${backendService1}candidates/${cid}`, payload)
    },
    deleteCandidate: (cid) => {
        return axios.delete(`${backendService1}candidates/${cid}`);
    }
};

