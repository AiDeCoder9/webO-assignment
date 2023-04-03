import { apiList } from '@/controller';
import performApiAction from '@/service/api-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
const { getEmployeeList, getEmployeeDetail, updateEmployee, createEmployee } = apiList;
import { v4 as uuidv4 } from 'uuid';
import { SuccessToast } from '@/components/feedback/ToastNotifier/ToastNotifier';
export const useEmployeeList = () => {
  return useQuery([getEmployeeList.queryKeyName], () => performApiAction<any>(getEmployeeList), {
    select: (data) => {
      console.log('before data', data);
      return data?.data?.results;
    }
  });
};

export const useEmployeeDetail = (id: string | undefined) => {
  return useQuery(
    [getEmployeeDetail.queryKeyName, id],
    () =>
      performApiAction<IEmployeeDetail>(getEmployeeDetail, {
        pathVariables: {
          id: id ?? ''
        }
      }),
    {
      select: (data) => {
        return data?.data;
      },
      enabled: !!id
    }
  );
};

export const useEmployeeCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: IEmployeeRequestData) => {
      if (requestData?.id) {
        return performApiAction(updateEmployee, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createEmployee, {
          requestData: { ...requestData, id: uuidv4() }
        });
      }
    },
    {
      onSuccess: () => {
        SuccessToast('Employee Detail Saved');
        queryClient.invalidateQueries(getEmployeeList.queryKeyName); // invalidating cache query and refetching all post
      }
    }
  );
};
