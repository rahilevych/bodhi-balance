import api from '../../../shared/api/axiosInstance';

export class PlanService {
  static async getAllPlans() {
    const res = await api.get(`/plans/all`);
    return res.data;
  }
  static async getPlanById(id: string) {
    const res = await api.get(`/plans/all/${id}`);
    return res.data;
  }
}
