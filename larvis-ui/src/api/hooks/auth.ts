import larvisServiceClient from '@/api/larvisServiceClient';
import { useAuthContext } from '@/contexts/authContext';
import { message } from 'antd';

interface LoginPayload {
  user_id: string;
  password: string;
}

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const loginUser = async (payload: LoginPayload): Promise<string> => {
  const res = await larvisServiceClient.post('/token', payload);
  return res.data.access;
};

export const useLoginUser = () => {
  const { login: storeToken } = useAuthContext();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (token) => {
      storeToken(token);
      message.success('Successfully logged in');
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401) {
        message.error(error.response?.statusText || 'Unauthorized');
      } else {
        message.error('Login failed:' + error.message);
      }
    },
  });
};
