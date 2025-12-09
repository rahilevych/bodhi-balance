import api from '../../../shared/api/axiosInstance';

export class StylesService {
  static async getAllStyles() {
    const res = await api.get(`/api/yoga/styles`);
    return res.data;
  }
}
