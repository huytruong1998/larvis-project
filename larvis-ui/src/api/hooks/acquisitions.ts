import larvisServiceClient from '../larvisServiceClient';

export const getAcquisitions = async () => {
  const res = await larvisServiceClient.get(`/acquisitions`);
  return res.data;
};
