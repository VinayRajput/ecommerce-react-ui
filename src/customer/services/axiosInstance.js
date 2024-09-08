import axios from "axios";
import { makeUseAxios } from 'axios-hooks'
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    // transformRequest: [function (data, headers) {
    //     return data;
    // }],
    // transformResponse: [function (data) {
    //     return data;
    // }],
});
export const useAxios = makeUseAxios({
  axios: axiosInstance
})
