import api from '../../../shared/api/axiosInstance';

export default class QuestionService {
  static async getAllFAQ() {
    const res = await api.get(`/api/questions/all`);
    return res.data;
  }
}
