import axios from "../helper/axios.js";

const backendService1 = import.meta.env.VITE_APP_SERVICE_1;

export const candidatesAPI = {
    createCandidate: (payload) => {
        return axios.post(`${backendService1}candidates`, payload)
            .catch(error => {
                console.error('Error creating candidate:', error.response ? error.response.data : error.message);
                throw error; // Rethrow the error to be caught by the calling function
            });
    },
    getCandidateById: (cid) => {
        return axios.get(`${backendService1}candidates/${cid}`)
            .catch(error => {
                console.error('Error fetching candidate:', error.response ? error.response.data : error.message);
                throw error; // Rethrow the error to be caught by the calling function
            });
    },
    updateCandidate: (id, payload) => {
        return axios.put(`${backendService1}/candidates/${id}`, payload);
    },
    deleteCandidate: (id) => {
        return axios.delete(`${backendService1}/candidates/${id}`);
    }
};
