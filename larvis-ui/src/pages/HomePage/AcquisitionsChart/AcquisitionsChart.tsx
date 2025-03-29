import React, { useMemo } from 'react';
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
import './AcquisitionsChart.css';
import { useGetAcquisitions } from '@/api/hooks/acquisitions';
import { Alert, Spin } from 'antd';

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="custom-tooltip">
      <p className="tooltip-date">Date: {label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="tooltip-line">
          <span className="tooltip-amount">Amount: {entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export const AcquisitionsChart = () => {
  const { data: rawData, isPending, isError, error } = useGetAcquisitions();

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // aligns content to the bottom
        alignItems: 'center',
        height: '100%',
        minHeight: '400px',
      }}
    >
      <div
        style={{
          minWidth: '400px',
          maxWidth: '1000px',
          width: '100%',
          height: 300,
        }}
      >
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
                  value: 'Ore Sites',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#999' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="square"
                wrapperStyle={{
                  paddingLeft: 20,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1890ff"
                strokeWidth={2}
                name="Ore deposits"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
