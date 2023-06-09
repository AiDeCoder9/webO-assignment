/* eslint-disable @typescript-eslint/no-explicit-any */
import { FailToast } from '@/components/feedback/ToastNotifier/ToastNotifier';
import { RequestMethod } from '@/utils/enum';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import initApiRequest from './api-request';
import { sanitizeController } from './api-util';

export interface CustomResponse<TData = unknown> extends AxiosResponse {
  message: string;
  data: TData | null;
  status: number;
  config: AxiosRequestConfig;
  isAxiosError: boolean;
}

/**
 * Manages API call and updates reducer with success or failure
 * @param apiDetails redux action and api config
 * @param apiRequestDetails request details for XMLHTTP request
 */
export default async function performApiAction<TData = unknown>(
  apiDetails: APIDetailType,
  apiRequestDetails: APIRequestDetail = {}
): Promise<CustomResponse<TData>> {
  const { requestData, requestMethod, pathVariables, params, cancelSource } = apiRequestDetails;

  // Check for path variables in controllername
  const sanitizedApiDetails = sanitizeController(apiDetails, pathVariables);
  let responseData: any;
  try {
    responseData = await initApiRequest<TData>(
      sanitizedApiDetails,
      requestData,
      requestMethod || sanitizedApiDetails.requestMethod || 'GET',
      params,
      cancelSource
    );

    return responseData as CustomResponse<TData>;
  } catch (customThrownError) {
    const errorData = customThrownError as ResponseError;

    if (requestMethod !== RequestMethod.GET) {
      FailToast(`${errorData.message} .Please make sure your server is connected`);
    }
    throw new Error(errorData?.message);
  }
  return responseData as CustomResponse<TData>;
}
