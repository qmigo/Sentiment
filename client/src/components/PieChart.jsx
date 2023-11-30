import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DataPieChart({chartData:metric}) {

  
const data = [
  { id: 0, value: metric[0], label: 'Negative ', color: '#de2234' },
  { id: 1, value: metric[1], label: 'Neutral', color: '#e9bf8d' },
  { id: 2, value: metric[2], label: 'Positive' , color: '#e52e92'},
];

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={300}
    />
  );
}