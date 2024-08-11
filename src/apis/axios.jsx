import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL
})

const authApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_AUTH_BASE_URL
})

const mailApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_MAIL_BASE_URL
})

const adminApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_ADMIN_BASE_URL
})

const userApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_STUDENT_BASE_URL
})
const testApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_TEST_BASE_URL
})
const questionApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_QUESTION_BASE_URL
})

const fileUploadApi = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_FILEUPLOAD_BASE_URL
})



export { api, adminApi, authApi, mailApi, userApi, fileUploadApi, testApi,questionApi }