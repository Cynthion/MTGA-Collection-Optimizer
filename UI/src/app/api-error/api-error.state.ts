export interface ApiErrorDto {
  statusCode: number;
  message: string;
  apiErrorCode: number;
}

export interface ApiErrorState extends ApiErrorDto {

}

export const initialApiErrorState: ApiErrorState = {
  statusCode: 0,
  message: '',
  apiErrorCode: 0,
};
