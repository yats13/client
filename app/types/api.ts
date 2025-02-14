export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export type ApiErrorResponse = {
  error: string;
  status?: number;
};

export type ApiSuccessResponse<T> = {
  data: T;
  status?: number;
}; 