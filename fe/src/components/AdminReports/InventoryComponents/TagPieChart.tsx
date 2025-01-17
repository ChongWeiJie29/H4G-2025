import React from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

interface TagPieChartProps {
  tagData: { tag: string; count: number }[];
}

const TagPieChart: React.FC<TagPieChartProps> = ({ tagData }) => {
  // Prepare data for the pie chart
  const data = {
    labels: tagData.map((item) => item.tag),
    datasets: [
      {
        label: "Product Distribution by Tags",
        data: tagData.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  // Optional chart options
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <ChartContainer>
      <h2>Inventory Distribution by Tags</h2>
      <Pie data={data} options={options} />
    </ChartContainer>
  );
};

export default TagPieChart;

