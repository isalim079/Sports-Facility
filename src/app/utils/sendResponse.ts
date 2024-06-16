import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  token?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {

  const responseObject: any = {
    success: data.success,
    statuscode: data.statusCode,
    message: data.message,
    data: data.data,
  }

  if(data.token) {
    responseObject.token = data.token
  }

  res.status(data?.statusCode).json(responseObject);

};

export default sendResponse;
