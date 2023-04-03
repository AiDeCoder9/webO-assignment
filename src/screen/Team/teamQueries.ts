import { apiList } from '@/controller';
import performApiAction from '@/service/api-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
const { getTeamList, getTeamDetail, updateTeam, createTeam } = apiList;
import { v4 as uuidv4 } from 'uuid';
import { SuccessToast } from '@/components/feedback/ToastNotifier/ToastNotifier';
export const useTeamList = () => {
  return useQuery([getTeamList.queryKeyName], () => performApiAction<any>(getTeamList), {
    select: (data) => {
      console.log('before data', data);
      return data?.data?.results;
    }
  });
};

export const useTeamDetail = (id: string | undefined) => {
  return useQuery(
    [getTeamDetail.queryKeyName, id],
    () =>
      performApiAction<IEmployeeDetail>(getTeamDetail, {
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

export const useTeamCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: IEmployeeRequestData) => {
      if (requestData?.id) {
        return performApiAction(updateTeam, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createTeam, {
          requestData: { ...requestData, id: uuidv4() }
        });
      }
    },
    {
      onSuccess: () => {
        SuccessToast('Team Detail Saved');
        queryClient.invalidateQueries(getTeamList.queryKeyName); // invalidating cache query and refetching all post
      }
    }
  );
};
