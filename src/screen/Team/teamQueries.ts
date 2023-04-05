import { apiList } from '@/controller';
import performApiAction from '@/service/api-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { SuccessToast } from '@/components/feedback/ToastNotifier/ToastNotifier';
const { getTeamList, getTeamDetail, updateTeam, createTeam, deleteTeam } = apiList;
export const useTeamList = () => {
  return useQuery(
    [getTeamList.queryKeyName],
    () => performApiAction<Array<ITeamRequestData>>(getTeamList),
    {
      select: (data) => {
        return data?.data;
      }
    }
  );
};

export const useTeamDetail = (id: string | undefined) => {
  return useQuery(
    [getTeamDetail.queryKeyName, id],
    () =>
      performApiAction<ITeamDetail>(getTeamDetail, {
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
    (requestData: ITeamRequestData) => {
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
        queryClient.invalidateQueries([getTeamList.queryKeyName]);
        queryClient.invalidateQueries([getTeamDetail.queryKeyName]);
      }
    }
  );
};

export const useTeamRemove = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return performApiAction(deleteTeam, {
        pathVariables: { id }
      });
    },
    {
      onSuccess: () => {
        SuccessToast('Team Deleted Successfully');
        queryClient.invalidateQueries(getTeamList.queryKeyName); // invalidating cache query and refetching all post
      }
    }
  );
};
