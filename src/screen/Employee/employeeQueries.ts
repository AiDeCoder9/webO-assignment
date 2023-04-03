import { apiList } from '@/controller';
import performApiAction from '@/service/api-service';
import { useQuery } from 'react-query';
const { getEmployeeList, getEmployeeDetail } = apiList;

export const useEmployeeList = () => {
  return useQuery(
    [getEmployeeList.queryKeyName],
    () => performApiAction<ScreenWiseResponse>(getEmployeeList),
    {
      select: (data) => {
        return data?.data?.results;
      }
    }
  );
};

export const useEmployeeDetail = (index: string) => {
  return useQuery(
    [getEmployeeDetail.queryKeyName, index],
    () =>
      performApiAction<any>(getEmployeeDetail, {
        pathVariables: {
          index: index
        }
      }),
    {
      select: (data) => {
        return data?.data;
      },
      enabled: !!index
    }
  );
};
