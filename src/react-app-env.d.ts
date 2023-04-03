/// <reference types="react-scripts" />

type Primitive = string | boolean | number;

interface APIDetailType {
  /**Query Keys Action Name */
  queryKeyName: string;
  /**Request API URI */
  controllerName: string;
  /**Request Method; Defaults as GET */
  requestMethod?: RequestMethod;
  /**Request Body Type */
  requestBodyType?: RequestBodyType;
}

type RequestDataType = Primitive & (File | Array | { [key: string]: RequestData });
interface GenericObj<Value = string> {
  [key: string]: Value;
}
interface BasicResponse {
  count: number;
}

type ValPrimitive = string | number | boolean;

interface IData {
  index: string;
  name: string;
  url: string;
}
