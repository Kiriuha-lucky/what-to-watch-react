import request from 'axios';
import { toast } from 'react-toastify';
import { HTTP_CODE } from '../types/http-code';

export const errorHandle = (error: unknown): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {

    switch (true) {
      case response.status === HTTP_CODE.BAD_REQUEST:
        toast.error(response.data.error);
        break;
      case response.status === HTTP_CODE.UNAUTHORIZED:
        toast.error(response.data.error);
        break;
      case response.status === HTTP_CODE.NOT_FOUND:
        toast.error('Offer not found');
        break;
      default:
        toast.error(response.data.error);
        break;
    }
  }
};
