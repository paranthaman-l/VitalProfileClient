import { adminApi } from "../apis/axios";

class AdminService {
    checkToken(){
        return adminApi.get('/isValidToken');
    }
    getUser(){
        return adminApi.get("/auth");
    }
}

export default new AdminService();