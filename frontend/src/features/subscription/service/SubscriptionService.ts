import api from '../../../shared/api/axiosInstance';

export class SubscriptionService {
  static async getSubscriptionByUserId() {
    const res = await api.get(`/api/subscription/active`);
    return res.data;
  }
}
