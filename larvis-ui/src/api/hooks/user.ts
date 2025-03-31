import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import larvisServiceClient from '../larvisServiceClient';
import { AxiosError } from 'axios';
import { User } from '@/type/user';
import { message } from 'antd';

const getUserById = async (userId: string) => {
  const res = await larvisServiceClient.get(`/users/${userId}`);
  return res.data;
};

const getUsers = async () => {
  const res = await larvisServiceClient.get(`/users`);
  return res.data;
};

const updateUser = async (user: User) => {
  const response = await larvisServiceClient.post(`/users/${user.user_id}`, {
    name: user.name,
    password: user.password,
  });

  return response.data;
};

// Hooks
export const useGetUsers = () => {
  return useQuery<User[], AxiosError>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<User, AxiosError>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId, //  run query if userId is truth
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: (data: User) => {
      message.success('Successfully update user!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.user_id] });
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401) {
        message.error(error.response?.statusText || 'Unauthorized');
      } else {
        message.error('Failed to update user:' + error.message);
      }
    },
  });
};
