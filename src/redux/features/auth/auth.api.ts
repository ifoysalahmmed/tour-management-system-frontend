import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  ISendOTP,
  IVerifyOTP,
  Root,
} from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Root<ILoginResponse>, ILogin>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),
    register: builder.mutation<Root<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOTP: builder.mutation<Root<null>, ISendOTP>({
      query: (userEmail) => ({
        url: "/otp/send",
        method: "POST",
        data: userEmail,
      }),
    }),
    verifyOTP: builder.mutation<Root<null>, IVerifyOTP>({
      query: (otpData) => ({
        url: "/otp/verify",
        method: "POST",
        data: otpData,
      }),
    }),
    resendOTP: builder.mutation<Root<null>, ISendOTP>({
      query: (userEmail) => ({
        url: "/otp/send",
        method: "POST",
        data: userEmail,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
} = authApi;
