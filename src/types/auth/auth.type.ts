export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    auths: [
      {
        providerId: string;
        provider: string;
      },
    ];
    role: TRole;
    isVerified: boolean;
    isActive: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  email: string;
  auths: [
    {
      providerId: string;
      provider: string;
    },
  ];
  role: TRole;
  isVerified: boolean;
  isActive: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISendOTP {
  email: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
}

export interface IUserInfoResponse {
  _id: string;
  name: string;
  email: string;
  auths: [
    {
      providerId: string;
      provider: string;
    },
  ];
  role: TRole;
  isVerified: boolean;
  isActive: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
