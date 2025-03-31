import { useQuery } from '@tanstack/react-query';
import larvisServiceClient from '../larvisServiceClient';
import { AxiosError } from 'axios';

type Acquisition = {
  timestamp: number;
  ore_sites: number;
};

const getAcquisitions = async () => {
  const res = await larvisServiceClient.get(`/acquisitions`);
  return res.data;
};

export const useGetAcquisitions = () => {
  return useQuery<Acquisition[], AxiosError>({
    queryKey: ['acquisitions'],
    queryFn: getAcquisitions,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
