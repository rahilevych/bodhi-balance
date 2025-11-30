import api from '../../../shared/api/axiosInstance';

export class ScheduleService {
  static async getAllTrainingForDay(date: Date) {
    const res = await api.get(`/schedule/trainings`, {
      params: { date },
    });
    return res.data;
  }
  static async getTrainingById(id: string) {
    const res = await api.get(`/schedule/trainings/training/${id}`);
    return res.data;
  }
}
