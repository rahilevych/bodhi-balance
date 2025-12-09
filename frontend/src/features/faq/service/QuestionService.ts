import api from '../../../shared/api/axiosInstance';

export default class QuestionService {
  static async getAllFAQ() {
    const res = await api.get(`/questions/all`);
    return res.data;
  }
}
