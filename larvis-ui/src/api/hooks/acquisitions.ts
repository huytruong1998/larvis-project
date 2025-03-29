import { useMutation, useQuery } from '@tanstack/react-query';
import larvisServiceClient from '../larvisServiceClient';

type Acquisition = {
  timestamp: number;
  ore_sites: number;
};

export const getAcquisitions = async () => {
  const res = await larvisServiceClient.get(`/acquisitions`);
  return res.data;
};

export const useGetAcquisitions = () => {
  return useQuery<Acquisition[], Error>({
    queryKey: ['acquisitions'],
    queryFn: getAcquisitions,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
