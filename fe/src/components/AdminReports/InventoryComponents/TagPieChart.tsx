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

const PieContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 500px;
  min-width: 200px;
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
      title: {
        display: true,
        text: "Inventory Distribution by Tags",
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
    <PieContainer>
      <Pie data={data} options={options} />
    </PieContainer>
  );
};

export default TagPieChart;
