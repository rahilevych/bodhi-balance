import api from '../../../shared/api/axiosInstance';

export class PaymentService {
  static async createCheckoutSession(productId: string, type: string) {
    let res;
    switch (type) {
      case 'training':
        res = await api.post(`/api/booking/training`, {
          productId,
          type,
        });
        break;
      case 'subscription':
        res = await api.post(`/api/subscription/buy`, {
          productId,
          type,
        });
        break;

      default:
        throw new Error(`Unknown type: ${type}`);
    }
    return res.data;
  }
}
