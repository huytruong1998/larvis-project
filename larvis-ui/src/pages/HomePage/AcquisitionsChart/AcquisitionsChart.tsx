import React, { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styles from './AcquisitionsChart.module.css';
import { useGetAcquisitions } from '@/api/hooks/acquisitions';
import { Alert, Spin, Typography } from 'antd';
import { useIsMobile } from '@/utils/hooks';
import { CustomTooltip } from '@/components/CustomTooltip/CustomTooltip';

const { Title } = Typography;

export const AcquisitionsChart = () => {
  const { data: rawData, isPending, isError, error } = useGetAcquisitions();
  const isMobile = useIsMobile();

  const data = useMemo(() => {
    if (!rawData) return [];

    const grouped: Record<string, number> = {};

    rawData
      .sort((a, b) => a.timestamp - b.timestamp)
      .forEach((point) => {
        const date = new Date(point.timestamp * 1000).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
        });

        grouped[date] = (grouped[date] || 0) + point.ore_sites;
      });

    return Object.entries(grouped).map(([time, value]) => ({ time, value }));
  }, [rawData]);

  return (
    <div className={styles.acquisitionsChartContainer}>
      <Title level={2} className={styles.chartTitle}>
        Satellite Monthly Ore Acquisitions
      </Title>
      {isPending && <Spin spinning={isPending} />}

      {isError && (
        <Alert
          message={'Error loading Acquisitions data: ' + (error?.message || 'Undefined')}
          type="error"
          showIcon
        />
      )}

      {!isError && !isPending && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: 'Date',
                position: 'insideBottom',
                offset: -5,
                style: { fill: '#999' },
              }}
            />
            <YAxis
              label={{
                value: 'Ore Amount',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#999' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign={isMobile ? 'bottom' : 'middle'}
              align={isMobile ? 'center' : 'right'}
              layout={isMobile ? 'horizontal' : 'vertical'}
              iconType="square"
              wrapperStyle={{
                paddingTop: isMobile ? 14 : 0,
                paddingLeft: 20,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1890ff"
              strokeWidth={2}
              name="Ore deposits"
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
