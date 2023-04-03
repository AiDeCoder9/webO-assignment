/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  CancelTokenSource,
  CancelTokenStatic,
  Method
} from 'axios';

const manageErrorResponse = (error: AxiosError) => {
  const errorResponse: ResponseError = {
    message: 'Error',
    data: null,
    status: false
  };

  errorResponse.message = error.message; // Something happened in setting up the request that triggered an Error

  errorResponse.config = error.config; // Request Params Configs
  errorResponse.isAxiosError = error.isAxiosError; //If Axios Error

  return errorResponse;
};

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

export default function initApiRequest<TData>(
  apiDetails: APIDetailType,
  requestData: RequestDataType,
  requestMethod: Method,
  params?: RequestParam,
  cancelSource?: CancelTokenSource
): Promise<AxiosResponse<TData>> {
  // API URL
  const url = process.env.REACT_APP_API_ENDPOINT;

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };
  const transformedRequestData = { data: requestData };

  let axiosReqParams: AxiosRequestConfig = {
    // baseURL: apiDetails.controllerName,
    baseURL: url,
    url: apiDetails.controllerName,
    method: requestMethod,
    responseType: 'json',
    timeout: 60 * 3 * 1000,
    cancelToken: cancelSource ? cancelSource.token : source.token,
    headers: headers,
    ...transformedRequestData
  };

  if (params) {
    axiosReqParams = {
      ...axiosReqParams,
      params: params
    };
  }

  return Axios.request(axiosReqParams)
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => {
      const errorResponse = manageErrorResponse(error);
      throw errorResponse;
    });
}
