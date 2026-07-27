export type {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  ISendOTP,
  IVerifyOTP,
  IUserInfoResponse,
} from "./auth.type";

export interface TMeta {
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface TErrorSource {
  path: string | number;
  message: string;
}

export interface Root<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
  errorSources?: TErrorSource[];
  stack?: string;
}
