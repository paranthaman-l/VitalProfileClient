import { testApi } from "../apis/axios";

class TestService {
    GetAllTest() {
        return testApi.get("", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
    }
    GetTest(tid) {
        return testApi.get(`/${tid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
    }
}

export default new TestService();