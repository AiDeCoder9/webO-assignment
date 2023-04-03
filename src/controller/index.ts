import { RequestBodyType, RequestMethod } from '@/utils/enum';

const apiDetails = {
  getEmployeeList: {
    controllerName: 'races',
    queryKeyName: 'GET_DRAGON_RACES_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getEmployeeDetail: {
    controllerName: 'races',
    queryKeyName: 'GET_DRAGON_RACES_LIST_1',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getDragonRaces: {
    controllerName: 'races',
    queryKeyName: 'GET_DRAGON_RACES_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },

  getSpellList: {
    controllerName: 'spells',
    queryKeyName: 'GET_SPELLS_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getSpellDetail: {
    controllerName: 'spells/{index}',
    queryKeyName: 'GET_SPELLS_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getMonsterList: {
    controllerName: 'monsters',
    queryKeyName: 'GET_MONSTERS_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getMonsterDetail: {
    controllerName: 'monsters/{index}',
    queryKeyName: 'GET_MONSTERS_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getRacesList: {
    controllerName: 'races',
    queryKeyName: 'GET_RACES_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getRacesDetail: {
    controllerName: 'races/{index}',
    queryKeyName: 'GET_RACES_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  }
};

type ApiList = typeof apiDetails;

export const apiList: ApiList = apiDetails;
