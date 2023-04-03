interface APIRequestDetail {
  /**Request data for the API */
  requestData?: RequestDataType;
  /** REST API Method
   *
   * This will override requestMethod provided by apiDetails
   */
  requestMethod?: Method;
  /**Path variables present in controller
   *
   * Provided pathVariables -> {id: 1, type: 'test'}
   * Converts controller-url/{id}/{type} -> controller-url/1/test
   */
  pathVariables?: { [key: string]: Primitive };
  /**Request params
   *
   * Provided params -> {id: 1, type: 'test'}
   * Converts controller-url -> controller-url?id=1&type=test
   */
  params?: RequestParam;
  /**Axios cancel token source */
  cancelSource?: CancelTokenSource;
  /**Disable Success Toast */
  disableSuccessToast?: boolean;
  /**Disable Failure Toast */
  disableFailureToast?: boolean;
  enableSuccessToast?: boolean;
}

interface CommonArrayResponseTypes<T> {
  description?: string;
  servedBy?: string;
  status?: number;
  success?: boolean;
  data: {
    hasNext?: boolean;
    records: T;
    totalPages: number;
    totalRecords: number;
  };
}

interface ArrayResponseTypes<T> {
  description?: string;
  servedBy?: string;
  status?: number;
  success?: boolean;
  data: {
    next?: null | number;
    records: T;
    previous?: null | number;
    count?: number;
  };
}

interface RequestParam {
  [key: string]: Primitive | undefined;
}
interface TransformedRequestData {
  auth?: AxiosBasicCredentials;
  data: unknown;
}
interface ResponseError {
  message: string;
  data: null;
  status: boolean;
  response?: AxiosResponse;
  config?: AxiosRequestConfig;
  isAxiosError?: boolean;
}

type APIResponseDetail<TData = unknown> = Promise<CustomResponse<TData>>;
