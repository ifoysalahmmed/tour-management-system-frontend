import type { ComponentType } from "react";

export type {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  ISendOTP,
  IVerifyOTP,
  IUserInfoResponse,
  TRole,
} from "./auth/auth.type";
export type {
  ITourTypeRequest,
  ITourTypeResponse,
} from "./tourType/tourType.type";
export type { ApiError } from "./error.type";

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

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
