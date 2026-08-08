import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ApiError = FetchBaseQueryError & {
  data?: {
    statusCode?: number;
    message?: string;
  };
};
