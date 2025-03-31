import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import larvisServiceClient from '../larvisServiceClient';

type Acquisition = {
  timestamp: number;
  ore_sites: number;
};

const getAcquisitions = async () => {
  const res = await larvisServiceClient.get(`/acquisitions`);
  return res.data;
};

export default function useGetAcquisitions() {
  return useQuery<Acquisition[], AxiosError>({
    queryKey: ['acquisitions'],
    queryFn: getAcquisitions,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
