import { questionApi } from "../apis/axios";

class QuestionService {
    getQuestioin(qid) {
        return questionApi.get(`/${qid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
    }
}

export default new QuestionService();