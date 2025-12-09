import api from '../../../shared/api/axiosInstance';

export class ScheduleService {
  static async getAllTrainingForDay(date: Date) {
    const res = await api.get(`/api/schedule/trainings`, {
      params: { date },
    });
    return res.data;
  }
  static async getTrainingById(id: string) {
    const res = await api.get(`/api/schedule/trainings/training/${id}`);
    return res.data;
  }
}
