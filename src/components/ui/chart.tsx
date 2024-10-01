// components/DonutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define TypeScript types for the props
interface DonutChartProps {
  data: {
    labels: string[];
    values: number[];
  },
  title:string
}

// Define the DonutChart component with TypeScript types
const DonutChart: React.FC<DonutChartProps> = ({ data ,title}) => {
  const chartData = {
    datasets: [
      {
        data: data.values,
        backgroundColor: ['#1E3A8A', '#f0f0f2'], // Background colors
        borderColor: ['#FFFFFF', '#FFFFFF'], // Border colors
      },
    ],
  };

  const chartOptions = {
    cutout: '65%', // Adjust this value to make the hole larger or smaller
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc: number, value: number) => acc + value, 0);
            const value = dataset.data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label} ${title}: ${value} Hrs`;
          },
        },
      },
    },
  };

  return (
    <div className="relative w-[150px] h-[150px] flex items-center justify-center">
      <Doughnut data={chartData} options={chartOptions} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-gray-800 text-xs font-extrabold text-center	">
        {title}
      </div>
    </div>
  );
};

export default DonutChart;
