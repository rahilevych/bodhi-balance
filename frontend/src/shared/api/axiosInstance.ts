import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const status = error.response.status;

//       if (status === 401) {
//         console.warn('Unauthorized');
//       }

//       return Promise.reject({
//         status,
//         message: error.response.data?.message || 'Error occurred',
//       });
//     }
//     if (error.request) {
//       return Promise.reject({
//         message: 'Check your internet connection',
//       });
//     }
//     return Promise.reject({
//       message: error.message || 'Unexpected error',
//     });
//   },
// );

export default api;
