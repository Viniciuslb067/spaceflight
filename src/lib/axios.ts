/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { AxiosError } from 'axios';

const config = {
  baseURL: 'https://spaceflight-backend.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
};

const unathenticatedInstance = axiosInstance.create(config);

export default {
  request() {

    const interceptor = unathenticatedInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    unathenticatedInstance.interceptors.request.use(
      function (config) {
        unathenticatedInstance.interceptors.response.eject(interceptor);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    return unathenticatedInstance;
  },
};
