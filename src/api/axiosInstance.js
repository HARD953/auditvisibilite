import axios from "axios";
import { redirect } from "react-router-dom";

export const baseURL = "https://auditapi.up.railway.app";

export const auditValue = "lanfia_0501AO2";
export const instance = axios.create({
    baseURL: 'https://auditapi.up.railway.app/api/',
    // timeout: 1000,
    
  });

export const attacheImageUrl = (url)=>{
  return `${baseURL}${url}`
}

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest =  error.config

    if(error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true
      // const newToken = await refreshAccessToken()
      // console.log("newToekn ::: ",newToken)
      // localStorage.setItem('accessToken', newToken);
      // localStorage.removeItem('accessToken-audit-visibility');
      localStorage.clear();
      redirect("/")
      
      // originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axios(originalRequest);
    }
  }
) 

export const configHeadersToken = () => {
  const token = localStorage.getItem('accessToken-audit-visibility')
    return {
          headers:{
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token 
      }
    }
}
  
export const configHeadersFormDataToken = () => {
  const token = localStorage.getItem('accessToken-audit-visibility')
  return {
          headers:{
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
    }
  }
}
  
// const refreshAccessToken = async()=>{
//     const response = await instance.post('token/refresh/',{
//       refresh: localStorage.getItem('refreshToken')
//     });
//     return response.data.access_token;
//  }













