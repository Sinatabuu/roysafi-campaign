// src/lib/api-types.ts (optional helper file)

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiError = {
  ok: false;
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
