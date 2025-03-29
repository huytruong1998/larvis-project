import { useQuery } from '@tanstack/react-query';
import larvisServiceClient from '../larvisServiceClient';
import { AxiosError } from 'axios';

type User = {
  user_id: string;
  name: string;
};

export const getProfileById = async (userId: string) => {
  const res = await larvisServiceClient.get(`/users/${userId}`);
  return res;
};

export const getUsers = async () => {
  const res = await larvisServiceClient.get(`/users`);
  return res.data;
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
