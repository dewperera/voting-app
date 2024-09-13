import axios from "../helper/axios.js";

const backendService1 = import.meta.env.VITE_APP_SERVICE_3;

export const electionAPI = {
    createVote: (payload) => {
        return axios.post(`${backendService1}votes`, payload)
    }
   /* getVoteById: (id) => {
        return axios.get(`${backendService1}votes/${id}`)
            .catch(error => {
                console.error('Error fetching vote:', error.response ? error.response.data : error.message);
                throw error; // Rethrow the error to be caught by the calling function
            });
    },
    updateVote: (id, payload) => {
        return axios.put(`${backendService1}votes/${id}`, payload)
            .catch(error => {
                console.error('Error updating vote:', error.response ? error.response.data : error.message);
                throw error; // Rethrow the error to be caught by the calling function
            });
    },
    deleteVote: (id) => {
        return axios.delete(`${backendService1}votes/${id}`)
            .catch(error => {
                console.error('Error deleting vote:', error.response ? error.response.data : error.message);
                throw error; // Rethrow the error to be caught by the calling function
            });
    }*/
};
