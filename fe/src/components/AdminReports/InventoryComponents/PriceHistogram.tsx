import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarContainer = styled.div`
  align-self: center;
  width: 100%;
  height: auto;
  max-width: 700px;
  min-width: 400px;
`;

interface PriceHistogramProps {
  priceData: number[];
}

const PriceHistogram: React.FC<PriceHistogramProps> = ({ priceData }) => {
  // Define price bins for the histogram
  const bins = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
  const binLabels = bins
    .map((bin, index) =>
      index < bins.length - 1 ? `${bin} - ${bins[index + 1]}` : null,
    )
    .filter(Boolean) as string[];

  // Count items in each bin
  const binCounts = Array(bins.length - 1).fill(0);
  priceData.forEach((price) => {
    for (let i = 0; i < bins.length - 1; i++) {
      if (price >= bins[i] && price < bins[i + 1]) {
        binCounts[i]++;
        break;
      }
    }
  });

  // Data for the histogram
  const data = {
    labels: binLabels,
    datasets: [
      {
        label: "Number of Items",
        data: binCounts,
        backgroundColor: "#36A2EB",
        borderColor: "#007bff",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Items by Price",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price Range in 💳",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Items",
        },
        beginAtZero: true,
        min: 0,
        max: Math.max(...binCounts) + 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
      <BarContainer>
        <Bar data={data} options={options} />
      </BarContainer>
  );
};

export default PriceHistogram;
