import api from '../../../shared/api/axiosInstance';

export class StylesService {
  static async getAllStyles() {
    const res = await api.get(`/yoga/styles`);

    return res.data;
  }
}
