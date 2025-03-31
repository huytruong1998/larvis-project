import larvisServiceClient from '@/api/larvisServiceClient';
import { useAuthContext } from '@/contexts/authContext';
import { message } from 'antd';

type LoginPayload = {
  user_id: string;
  password: string;
};

type LoginResponse = {
  userId: string;
  token: string;
};

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await larvisServiceClient.post('/token', payload);

  return {
    token: res.data.access,
    userId: payload.user_id,
  };
};

export const useLoginUser = () => {
  const { login: storeToken, setCurrentUserId } = useAuthContext();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      storeToken(data.token);
      setCurrentUserId(data.userId);
      message.success('Successfully logged in!');
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
