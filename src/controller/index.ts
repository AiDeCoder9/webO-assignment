import { RequestBodyType, RequestMethod } from '@/utils/enum';

const apiDetails = {
  getEmployeeList: {
    controllerName: 'employees',
    queryKeyName: 'GET_EMPLOYEE_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getEmployeeDetail: {
    controllerName: 'employees/{id}',
    queryKeyName: 'GET_EMPLOYEE_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  createEmployee: {
    controllerName: 'employees',
    queryKeyName: 'CREATE_EMPLOYEE',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  updateEmployee: {
    controllerName: 'employees/{id}',
    queryKeyName: 'UPDATE_EMPLOYEE',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteEmployee: {
    controllerName: 'employee',
    queryKeyName: 'DELETE_EMPLOYEE',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.DELETE
  }
};

type ApiList = typeof apiDetails;

export const apiList: ApiList = apiDetails;
