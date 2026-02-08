import api from '../../../shared/api/axiosInstance';

export class StylesService {
  static async getAllStyles() {
    const res = await api.get(`/yoga/styles`);
    console.log(res.data);
    return res.data;
  }
}
