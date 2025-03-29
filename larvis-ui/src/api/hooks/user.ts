import larvisServiceClient from '../larvisServiceClient';

export const getProfileById = async (userId: string) => {
  const res = await larvisServiceClient.get(`/users/${userId}`);
  return res;
};
