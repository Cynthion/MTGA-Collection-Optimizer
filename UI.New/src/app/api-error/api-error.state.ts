export interface ApiErrorDto {
  statusCode: number;
  message: string;
  apiErrorCode: number;
}

export interface ApiErrorState extends ApiErrorDto {
  isSnackbarOpen: boolean;
}

export const initialApiErrorState: ApiErrorState = {
  statusCode: -1,
  message: '',
  apiErrorCode: -1,
  isSnackbarOpen: false,
};
