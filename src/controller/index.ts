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
    controllerName: 'employees/{id}',
    queryKeyName: 'DELETE_EMPLOYEE',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.DELETE
  },
  getTeamList: {
    controllerName: 'teams',
    queryKeyName: 'GET_TEAM_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getTeamDetail: {
    controllerName: 'teams/{id}',
    queryKeyName: 'GET_TEAM_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  createTeam: {
    controllerName: 'teams',
    queryKeyName: 'CREATE_TEAM',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  updateTeam: {
    controllerName: 'teams/{id}',
    queryKeyName: 'UPDATE_TEAM',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteTeam: {
    controllerName: 'teams/{id}',
    queryKeyName: 'DELETE_EMPLOYEE',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.DELETE
  }
};

type ApiList = typeof apiDetails;

export const apiList: ApiList = apiDetails;
