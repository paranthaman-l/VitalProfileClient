import { authApi, mailApi } from '../apis/axios';

class AuthService {

    Login(login) {
        return authApi.post("/login", login);
    }

    SendOTP(signUp) {
        return mailApi.post("/signup/send-otp", signUp);
    }

    SignUp(signUp) {
        return authApi.post("/signup", signUp);
    }

    LogOut() {
        return authApi.get("/logout", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
    }

}

export default new AuthService();