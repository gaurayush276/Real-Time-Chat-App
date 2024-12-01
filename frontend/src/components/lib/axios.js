import axios from "axios" 
export const axiosInstance = axios.create({
    baseURL : 'http://localhost:5001/app',
    withCredentials : true ,
})



// Without withCredentials: true: The browser will not send cookies with your API request, so the server won't be able to identify the client.

// With withCredentials: true: The browser includes the cookie, allowing the server to identify the user and process authenticated requests.

 