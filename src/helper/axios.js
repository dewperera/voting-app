import axios from 'axios';


const http=axios.create({
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

http.interceptors.response.use(
    (response) => {
    return Promise.resolve(response)
},
    (error) => {
        console.log(error);
        return Promise.reject(error);
    })

export default http;