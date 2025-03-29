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
import './TimeSeriesChart.css';

type RawDataPoint = {
  timestamp: number; // UNIX seconds
  ore_sites: number;
};

const rawData: RawDataPoint[] = [
  {
    timestamp: 1740696009,
    ore_sites: 8,
  },
  {
    timestamp: 1741779242,
    ore_sites: 18,
  },
  {
    timestamp: 1742659474,
    ore_sites: 36,
  },
  {
    timestamp: 1742102237,
    ore_sites: 36,
  },
  {
    timestamp: 1740734176,
    ore_sites: 11,
  },
  {
    timestamp: 1741235474,
    ore_sites: 39,
  },
  {
    timestamp: 1741752954,
    ore_sites: 22,
  },
  {
    timestamp: 1742614215,
    ore_sites: 25,
  },
  {
    timestamp: 1742390566,
    ore_sites: 18,
  },
  {
    timestamp: 1740780516,
    ore_sites: 38,
  },
  {
    timestamp: 1741405083,
    ore_sites: 27,
  },
  {
    timestamp: 1740887135,
    ore_sites: 24,
  },
  {
    timestamp: 1742080893,
    ore_sites: 26,
  },
  {
    timestamp: 1741399364,
    ore_sites: 4,
  },
  {
    timestamp: 1740692131,
    ore_sites: 23,
  },
  {
    timestamp: 1741807462,
    ore_sites: 17,
  },
  {
    timestamp: 1740950695,
    ore_sites: 9,
  },
  {
    timestamp: 1742590870,
    ore_sites: 5,
  },
  {
    timestamp: 1741961708,
    ore_sites: 16,
  },
  {
    timestamp: 1741752397,
    ore_sites: 11,
  },
  {
    timestamp: 1742150472,
    ore_sites: 34,
  },
  {
    timestamp: 1740713474,
    ore_sites: 2,
  },
  {
    timestamp: 1740662264,
    ore_sites: 33,
  },
  {
    timestamp: 1742055548,
    ore_sites: 38,
  },
  {
    timestamp: 1742941603,
    ore_sites: 20,
  },
  {
    timestamp: 1741011947,
    ore_sites: 29,
  },
  {
    timestamp: 1741992984,
    ore_sites: 38,
  },
  {
    timestamp: 1742671087,
    ore_sites: 3,
  },
  {
    timestamp: 1740804599,
    ore_sites: 30,
  },
  {
    timestamp: 1740763109,
    ore_sites: 31,
  },
  {
    timestamp: 1741377754,
    ore_sites: 24,
  },
  {
    timestamp: 1742248587,
    ore_sites: 31,
  },
  {
    timestamp: 1740890747,
    ore_sites: 37,
  },
  {
    timestamp: 1742157659,
    ore_sites: 18,
  },
  {
    timestamp: 1743155114,
    ore_sites: 9,
  },
  {
    timestamp: 1740921852,
    ore_sites: 30,
  },
  {
    timestamp: 1740673643,
    ore_sites: 18,
  },
  {
    timestamp: 1741880676,
    ore_sites: 5,
  },
  {
    timestamp: 1742727593,
    ore_sites: 32,
  },
  {
    timestamp: 1742044927,
    ore_sites: 25,
  },
  {
    timestamp: 1741416045,
    ore_sites: 28,
  },
  {
    timestamp: 1742902795,
    ore_sites: 2,
  },
  {
    timestamp: 1742834702,
    ore_sites: 32,
  },
  {
    timestamp: 1740990366,
    ore_sites: 28,
  },
  {
    timestamp: 1741252879,
    ore_sites: 24,
  },
  {
    timestamp: 1741432110,
    ore_sites: 18,
  },
  {
    timestamp: 1742333407,
    ore_sites: 13,
  },
  {
    timestamp: 1741184927,
    ore_sites: 34,
  },
  {
    timestamp: 1740913323,
    ore_sites: 19,
  },
  {
    timestamp: 1741988683,
    ore_sites: 40,
  },
  {
    timestamp: 1741165585,
    ore_sites: 8,
  },
  {
    timestamp: 1741622293,
    ore_sites: 33,
  },
  {
    timestamp: 1742621781,
    ore_sites: 0,
  },
  {
    timestamp: 1742708916,
    ore_sites: 40,
  },
  {
    timestamp: 1741373169,
    ore_sites: 38,
  },
  {
    timestamp: 1741925021,
    ore_sites: 11,
  },
  {
    timestamp: 1741748280,
    ore_sites: 27,
  },
  {
    timestamp: 1743181467,
    ore_sites: 41,
  },
  {
    timestamp: 1743192444,
    ore_sites: 7,
  },
  {
    timestamp: 1742908555,
    ore_sites: 9,
  },
  {
    timestamp: 1742782048,
    ore_sites: 20,
  },
  {
    timestamp: 1741369182,
    ore_sites: 31,
  },
  {
    timestamp: 1742008298,
    ore_sites: 25,
  },
  {
    timestamp: 1741114628,
    ore_sites: 18,
  },
  {
    timestamp: 1741716217,
    ore_sites: 19,
  },
  {
    timestamp: 1741017378,
    ore_sites: 31,
  },
  {
    timestamp: 1742815313,
    ore_sites: 0,
  },
  {
    timestamp: 1743039107,
    ore_sites: 32,
  },
  {
    timestamp: 1741766469,
    ore_sites: 41,
  },
  {
    timestamp: 1741137367,
    ore_sites: 11,
  },
  {
    timestamp: 1742319859,
    ore_sites: 35,
  },
  {
    timestamp: 1740653805,
    ore_sites: 13,
  },
  {
    timestamp: 1741127469,
    ore_sites: 12,
  },
  {
    timestamp: 1741564701,
    ore_sites: 22,
  },
  {
    timestamp: 1742232465,
    ore_sites: 6,
  },
  {
    timestamp: 1742641112,
    ore_sites: 11,
  },
  {
    timestamp: 1741953125,
    ore_sites: 41,
  },
  {
    timestamp: 1741046362,
    ore_sites: 9,
  },
  {
    timestamp: 1740830443,
    ore_sites: 34,
  },
  {
    timestamp: 1742673667,
    ore_sites: 35,
  },
  {
    timestamp: 1741139891,
    ore_sites: 34,
  },
  {
    timestamp: 1742079484,
    ore_sites: 37,
  },
  {
    timestamp: 1742656050,
    ore_sites: 26,
  },
  {
    timestamp: 1741264489,
    ore_sites: 31,
  },
  {
    timestamp: 1741458691,
    ore_sites: 9,
  },
  {
    timestamp: 1742321195,
    ore_sites: 23,
  },
  {
    timestamp: 1742989332,
    ore_sites: 8,
  },
  {
    timestamp: 1741914795,
    ore_sites: 39,
  },
  {
    timestamp: 1741286291,
    ore_sites: 10,
  },
  {
    timestamp: 1742490394,
    ore_sites: 4,
  },
  {
    timestamp: 1740880000,
    ore_sites: 10,
  },
  {
    timestamp: 1743000742,
    ore_sites: 31,
  },
  {
    timestamp: 1742001547,
    ore_sites: 1,
  },
  {
    timestamp: 1742729794,
    ore_sites: 7,
  },
  {
    timestamp: 1741116255,
    ore_sites: 32,
  },
  {
    timestamp: 1740739467,
    ore_sites: 21,
  },
  {
    timestamp: 1742374341,
    ore_sites: 22,
  },
  {
    timestamp: 1743086220,
    ore_sites: 32,
  },
  {
    timestamp: 1742929486,
    ore_sites: 16,
  },
  {
    timestamp: 1741716956,
    ore_sites: 21,
  },
  {
    timestamp: 1742368090,
    ore_sites: 7,
  },
  {
    timestamp: 1741702328,
    ore_sites: 2,
  },
  {
    timestamp: 1741926384,
    ore_sites: 4,
  },
  {
    timestamp: 1742352109,
    ore_sites: 26,
  },
  {
    timestamp: 1742570657,
    ore_sites: 8,
  },
  {
    timestamp: 1743084311,
    ore_sites: 18,
  },
  {
    timestamp: 1742881976,
    ore_sites: 32,
  },
  {
    timestamp: 1741357329,
    ore_sites: 35,
  },
  {
    timestamp: 1742571902,
    ore_sites: 2,
  },
  {
    timestamp: 1740662332,
    ore_sites: 40,
  },
  {
    timestamp: 1741723658,
    ore_sites: 40,
  },
  {
    timestamp: 1742459550,
    ore_sites: 23,
  },
  {
    timestamp: 1741426771,
    ore_sites: 18,
  },
  {
    timestamp: 1740767266,
    ore_sites: 13,
  },
  {
    timestamp: 1740825444,
    ore_sites: 6,
  },
  {
    timestamp: 1741667080,
    ore_sites: 41,
  },
  {
    timestamp: 1742018865,
    ore_sites: 23,
  },
  {
    timestamp: 1742917090,
    ore_sites: 36,
  },
  {
    timestamp: 1743147995,
    ore_sites: 37,
  },
  {
    timestamp: 1741195758,
    ore_sites: 1,
  },
  {
    timestamp: 1743132089,
    ore_sites: 3,
  },
  {
    timestamp: 1742288710,
    ore_sites: 15,
  },
  {
    timestamp: 1740734632,
    ore_sites: 40,
  },
  {
    timestamp: 1742521606,
    ore_sites: 20,
  },
  {
    timestamp: 1741875177,
    ore_sites: 22,
  },
  {
    timestamp: 1742362283,
    ore_sites: 18,
  },
  {
    timestamp: 1740628775,
    ore_sites: 41,
  },
  {
    timestamp: 1741164974,
    ore_sites: 3,
  },
  {
    timestamp: 1741794358,
    ore_sites: 21,
  },
  {
    timestamp: 1741647006,
    ore_sites: 33,
  },
  {
    timestamp: 1741147199,
    ore_sites: 16,
  },
  {
    timestamp: 1742237132,
    ore_sites: 36,
  },
  {
    timestamp: 1740868561,
    ore_sites: 6,
  },
  {
    timestamp: 1741437226,
    ore_sites: 40,
  },
  {
    timestamp: 1743155238,
    ore_sites: 18,
  },
  {
    timestamp: 1743141907,
    ore_sites: 27,
  },
  {
    timestamp: 1742987168,
    ore_sites: 28,
  },
  {
    timestamp: 1741616787,
    ore_sites: 19,
  },
  {
    timestamp: 1741294273,
    ore_sites: 19,
  },
  {
    timestamp: 1742393034,
    ore_sites: 9,
  },
  {
    timestamp: 1741686979,
    ore_sites: 24,
  },
  {
    timestamp: 1741003206,
    ore_sites: 10,
  },
  {
    timestamp: 1742428841,
    ore_sites: 18,
  },
  {
    timestamp: 1741291273,
    ore_sites: 26,
  },
  {
    timestamp: 1741579979,
    ore_sites: 8,
  },
  {
    timestamp: 1742376571,
    ore_sites: 9,
  },
  {
    timestamp: 1741479696,
    ore_sites: 41,
  },
  {
    timestamp: 1741862128,
    ore_sites: 22,
  },
  {
    timestamp: 1740707339,
    ore_sites: 35,
  },
  {
    timestamp: 1741572506,
    ore_sites: 7,
  },
  {
    timestamp: 1741268423,
    ore_sites: 29,
  },
  {
    timestamp: 1741200337,
    ore_sites: 40,
  },
  {
    timestamp: 1740830157,
    ore_sites: 18,
  },
  {
    timestamp: 1741568863,
    ore_sites: 10,
  },
  {
    timestamp: 1741164833,
    ore_sites: 24,
  },
  {
    timestamp: 1742003187,
    ore_sites: 26,
  },
  {
    timestamp: 1742413032,
    ore_sites: 20,
  },
  {
    timestamp: 1741606223,
    ore_sites: 31,
  },
  {
    timestamp: 1743165253,
    ore_sites: 8,
  },
  {
    timestamp: 1742276115,
    ore_sites: 4,
  },
  {
    timestamp: 1741155411,
    ore_sites: 12,
  },
  {
    timestamp: 1741199485,
    ore_sites: 8,
  },
  {
    timestamp: 1742942918,
    ore_sites: 38,
  },
  {
    timestamp: 1743073796,
    ore_sites: 1,
  },
  {
    timestamp: 1741383020,
    ore_sites: 4,
  },
  {
    timestamp: 1742763863,
    ore_sites: 33,
  },
  {
    timestamp: 1742092884,
    ore_sites: 34,
  },
  {
    timestamp: 1742582932,
    ore_sites: 21,
  },
  {
    timestamp: 1742801245,
    ore_sites: 27,
  },
  {
    timestamp: 1741461928,
    ore_sites: 40,
  },
  {
    timestamp: 1742672180,
    ore_sites: 26,
  },
  {
    timestamp: 1743183899,
    ore_sites: 32,
  },
  {
    timestamp: 1741403042,
    ore_sites: 17,
  },
  {
    timestamp: 1740989745,
    ore_sites: 26,
  },
  {
    timestamp: 1741567877,
    ore_sites: 2,
  },
  {
    timestamp: 1742348064,
    ore_sites: 30,
  },
  {
    timestamp: 1742384071,
    ore_sites: 20,
  },
  {
    timestamp: 1742488047,
    ore_sites: 5,
  },
  {
    timestamp: 1741433869,
    ore_sites: 15,
  },
  {
    timestamp: 1741148349,
    ore_sites: 5,
  },
  {
    timestamp: 1740929874,
    ore_sites: 9,
  },
  {
    timestamp: 1742603211,
    ore_sites: 34,
  },
  {
    timestamp: 1742924321,
    ore_sites: 3,
  },
  {
    timestamp: 1742166972,
    ore_sites: 35,
  },
  {
    timestamp: 1742223252,
    ore_sites: 15,
  },
  {
    timestamp: 1740749111,
    ore_sites: 31,
  },
  {
    timestamp: 1740772044,
    ore_sites: 34,
  },
  {
    timestamp: 1742942904,
    ore_sites: 1,
  },
  {
    timestamp: 1742301808,
    ore_sites: 13,
  },
  {
    timestamp: 1741927834,
    ore_sites: 11,
  },
  {
    timestamp: 1741162985,
    ore_sites: 17,
  },
  {
    timestamp: 1742365017,
    ore_sites: 29,
  },
  {
    timestamp: 1742609188,
    ore_sites: 4,
  },
  {
    timestamp: 1743149550,
    ore_sites: 6,
  },
  {
    timestamp: 1741311232,
    ore_sites: 38,
  },
  {
    timestamp: 1742025193,
    ore_sites: 7,
  },
  {
    timestamp: 1742385990,
    ore_sites: 19,
  },
  {
    timestamp: 1742859810,
    ore_sites: 0,
  },
  {
    timestamp: 1741119717,
    ore_sites: 20,
  },
  {
    timestamp: 1741146303,
    ore_sites: 40,
  },
  {
    timestamp: 1741700708,
    ore_sites: 33,
  },
  {
    timestamp: 1742759755,
    ore_sites: 18,
  },
  {
    timestamp: 1742909844,
    ore_sites: 9,
  },
  {
    timestamp: 1742299892,
    ore_sites: 38,
  },
  {
    timestamp: 1741828874,
    ore_sites: 2,
  },
  {
    timestamp: 1742928917,
    ore_sites: 39,
  },
  {
    timestamp: 1742983895,
    ore_sites: 13,
  },
  {
    timestamp: 1741471596,
    ore_sites: 17,
  },
  {
    timestamp: 1742249697,
    ore_sites: 8,
  },
  {
    timestamp: 1742069467,
    ore_sites: 8,
  },
  {
    timestamp: 1742214464,
    ore_sites: 11,
  },
  {
    timestamp: 1742002070,
    ore_sites: 1,
  },
  {
    timestamp: 1740869985,
    ore_sites: 18,
  },
  {
    timestamp: 1740931188,
    ore_sites: 34,
  },
  {
    timestamp: 1741875120,
    ore_sites: 38,
  },
  {
    timestamp: 1742980277,
    ore_sites: 18,
  },
  {
    timestamp: 1743051493,
    ore_sites: 31,
  },
  {
    timestamp: 1741550638,
    ore_sites: 24,
  },
  {
    timestamp: 1742599656,
    ore_sites: 12,
  },
  {
    timestamp: 1741829139,
    ore_sites: 15,
  },
  {
    timestamp: 1741949606,
    ore_sites: 7,
  },
  {
    timestamp: 1741149729,
    ore_sites: 4,
  },
  {
    timestamp: 1741431556,
    ore_sites: 9,
  },
  {
    timestamp: 1740798838,
    ore_sites: 27,
  },
  {
    timestamp: 1742597152,
    ore_sites: 14,
  },
  {
    timestamp: 1741026692,
    ore_sites: 36,
  },
  {
    timestamp: 1741451925,
    ore_sites: 38,
  },
  {
    timestamp: 1742589000,
    ore_sites: 33,
  },
  {
    timestamp: 1741969354,
    ore_sites: 38,
  },
  {
    timestamp: 1741223348,
    ore_sites: 22,
  },
  {
    timestamp: 1742871594,
    ore_sites: 30,
  },
  {
    timestamp: 1742656225,
    ore_sites: 17,
  },
  {
    timestamp: 1742539013,
    ore_sites: 28,
  },
  {
    timestamp: 1741808659,
    ore_sites: 0,
  },
  {
    timestamp: 1743001839,
    ore_sites: 29,
  },
  {
    timestamp: 1740996060,
    ore_sites: 7,
  },
  {
    timestamp: 1740857568,
    ore_sites: 3,
  },
  {
    timestamp: 1741369014,
    ore_sites: 34,
  },
  {
    timestamp: 1742653189,
    ore_sites: 4,
  },
  {
    timestamp: 1741508610,
    ore_sites: 36,
  },
  {
    timestamp: 1742079067,
    ore_sites: 27,
  },
  {
    timestamp: 1742119948,
    ore_sites: 9,
  },
  {
    timestamp: 1741051477,
    ore_sites: 23,
  },
  {
    timestamp: 1741520149,
    ore_sites: 17,
  },
  {
    timestamp: 1740969768,
    ore_sites: 22,
  },
  {
    timestamp: 1741535063,
    ore_sites: 32,
  },
  {
    timestamp: 1742505317,
    ore_sites: 29,
  },
  {
    timestamp: 1742899562,
    ore_sites: 21,
  },
  {
    timestamp: 1740617306,
    ore_sites: 26,
  },
  {
    timestamp: 1742142577,
    ore_sites: 30,
  },
  {
    timestamp: 1743180204,
    ore_sites: 0,
  },
  {
    timestamp: 1742253505,
    ore_sites: 22,
  },
  {
    timestamp: 1741351026,
    ore_sites: 22,
  },
  {
    timestamp: 1742197070,
    ore_sites: 19,
  },
  {
    timestamp: 1742281770,
    ore_sites: 24,
  },
  {
    timestamp: 1742607473,
    ore_sites: 31,
  },
  {
    timestamp: 1743010168,
    ore_sites: 5,
  },
  {
    timestamp: 1742734546,
    ore_sites: 0,
  },
  {
    timestamp: 1742633175,
    ore_sites: 38,
  },
  {
    timestamp: 1742754539,
    ore_sites: 30,
  },
  {
    timestamp: 1742843067,
    ore_sites: 38,
  },
  {
    timestamp: 1742990265,
    ore_sites: 10,
  },
  {
    timestamp: 1742789218,
    ore_sites: 34,
  },
  {
    timestamp: 1743101962,
    ore_sites: 19,
  },
  {
    timestamp: 1742189878,
    ore_sites: 35,
  },
  {
    timestamp: 1740969600,
    ore_sites: 28,
  },
  {
    timestamp: 1741676834,
    ore_sites: 22,
  },
  {
    timestamp: 1742865035,
    ore_sites: 34,
  },
  {
    timestamp: 1742167577,
    ore_sites: 32,
  },
  {
    timestamp: 1741395929,
    ore_sites: 39,
  },
  {
    timestamp: 1740996790,
    ore_sites: 16,
  },
  {
    timestamp: 1740807528,
    ore_sites: 41,
  },
  {
    timestamp: 1742143494,
    ore_sites: 25,
  },
  {
    timestamp: 1741062657,
    ore_sites: 41,
  },
  {
    timestamp: 1743066816,
    ore_sites: 39,
  },
  {
    timestamp: 1741959583,
    ore_sites: 18,
  },
  {
    timestamp: 1742539303,
    ore_sites: 26,
  },
  {
    timestamp: 1740787702,
    ore_sites: 40,
  },
  {
    timestamp: 1741214439,
    ore_sites: 38,
  },
  {
    timestamp: 1741292527,
    ore_sites: 38,
  },
  {
    timestamp: 1742948038,
    ore_sites: 27,
  },
  {
    timestamp: 1742760488,
    ore_sites: 38,
  },
  {
    timestamp: 1741311243,
    ore_sites: 12,
  },
  {
    timestamp: 1741028073,
    ore_sites: 12,
  },
  {
    timestamp: 1742070327,
    ore_sites: 5,
  },
  {
    timestamp: 1743109770,
    ore_sites: 1,
  },
  {
    timestamp: 1741451726,
    ore_sites: 19,
  },
  {
    timestamp: 1741168606,
    ore_sites: 6,
  },
  {
    timestamp: 1742844045,
    ore_sites: 33,
  },
  {
    timestamp: 1742287509,
    ore_sites: 7,
  },
  {
    timestamp: 1743013434,
    ore_sites: 31,
  },
  {
    timestamp: 1742958479,
    ore_sites: 36,
  },
  {
    timestamp: 1740738715,
    ore_sites: 7,
  },
  {
    timestamp: 1742076889,
    ore_sites: 18,
  },
  {
    timestamp: 1741165573,
    ore_sites: 14,
  },
  {
    timestamp: 1742102276,
    ore_sites: 6,
  },
  {
    timestamp: 1743190428,
    ore_sites: 17,
  },
  {
    timestamp: 1741667990,
    ore_sites: 17,
  },
  {
    timestamp: 1741366298,
    ore_sites: 3,
  },
  {
    timestamp: 1742876746,
    ore_sites: 25,
  },
];

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

export const TimeSeriesChart = () => {
  const data = useMemo(() => {
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
    <div style={{ minWidth: '300px', maxWidth: '1000px', width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
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
    </div>
  );
};
