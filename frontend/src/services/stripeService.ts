import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCheckoutSession = async (
  productId: string,
  type: string
) => {
  let res;

  switch (type) {
    case 'training':
      res = await axios.post(
        `${BASE_URL}/booking/training`,
        {
          productId,
          type,
        },
        { withCredentials: true }
      );
      console.log(res);
      break;

    case 'subscription':
      res = await axios.post(
        `${BASE_URL}/subscription/buy`,
        {
          productId,
          type,
        },
        { withCredentials: true }
      );
      break;

    default:
      throw new Error(`Unknown type: ${type}`);
  }

  return res.data;
};
