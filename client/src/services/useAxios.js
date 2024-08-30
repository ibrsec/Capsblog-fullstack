

import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenSuccess, fetchAuthLogout } from '../app/features/authSlice';


const useAxios = () => {

    // const baseURL = "http://localhost:10000/api";
    const baseURL = "/api";
const accessToken = useSelector(state=> state.auth.accessToken);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const dispatch = useDispatch();


    const axiosPublic = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const axiosToken = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+accessToken,
        },
    })


    axiosToken.interceptors.response.use(
        response => response,
        async (error) => {
          const originalRequest = error.config;
    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
              const refreshResponse = await axiosPublic.post('/auth/refresh', {
                bearer:{refreshToken}
              });
              console.log('refreshResponse', refreshResponse)
              const newAccessToken = refreshResponse.data.bearer.accessToken;
              console.log('newAccessToken', newAccessToken)
              dispatch(refreshTokenSuccess(newAccessToken));
    
              axiosToken.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              
              return axiosToken(originalRequest);
            } catch (refreshError) {
              dispatch(fetchAuthLogout());
              return Promise.reject(refreshError);
            }
          }
          
          return Promise.reject(error);
        }
      );



  return {axiosPublic, axiosToken}
}

export default useAxios