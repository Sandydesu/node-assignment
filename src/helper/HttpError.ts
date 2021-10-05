import { STATUS_CODES } from '../constants/api.constants';

export default class HttpError extends Error {
  statusCode: number;
  message: string;
  errorType: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorType = `${statusCode} ${STATUS_CODES[statusCode]}`;
  }
}
