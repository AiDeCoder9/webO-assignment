import { apiList } from '@/controller';
import performApiAction from '@/service/api-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { SuccessToast } from '@/components/feedback/ToastNotifier/ToastNotifier';
const { getEmployeeList, getEmployeeDetail, updateEmployee, createEmployee, deleteEmployee } =
  apiList;
export const useEmployeeList = () => {
  return useQuery(
    [getEmployeeList.queryKeyName],
    () => performApiAction<Array<IEmployeeRequestData>>(getEmployeeList),
    {
      select: (data) => {
        return data?.data;
      }
    }
  );
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
        queryClient.invalidateQueries(getEmployeeList.queryKeyName);
        queryClient.invalidateQueries(getEmployeeDetail.queryKeyName);
      }
    }
  );
};

export const useEmployeeRemove = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return performApiAction(deleteEmployee, {
        pathVariables: { id }
      });
    },
    {
      onSuccess: () => {
        SuccessToast('Employee removed Successfully');
        queryClient.invalidateQueries(getEmployeeList.queryKeyName); // invalidating cache query and refetching all post
      }
    }
  );
};
