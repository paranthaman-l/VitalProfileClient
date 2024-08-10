import { userApi } from "../apis/axios";

class StudentService {
    checkToken(){
        return userApi.get('/isValidToken');
    }
    getUser(){
        return userApi.get("/auth");
    }
}

export default new StudentService();