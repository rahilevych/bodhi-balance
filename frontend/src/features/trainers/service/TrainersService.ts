import api from '../../../shared/api/axiosInstance';

export class TrainersService {
  static async getAllTrainers() {
    const res = await api.get(`/api/trainers/all`);
    return res.data;
  }
}
