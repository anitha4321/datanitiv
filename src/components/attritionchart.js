import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttritionChart = ({ sortOrder, width }) => { // Added width prop
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        const labels = data.map(product => product.title);
        const prices = data.map(product => product.price);

        const formattedData = {
          labels,
          datasets: [
            {
              label: 'Product Prices',
              data: prices,
              backgroundColor: 'rgba(255,69,0, 0.7)',
              borderColor: 'rgba(139, 0, 0, 1)',
              borderWidth: 1,
            },
          ],
        };

        setOriginalData(data);
        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      const combinedData = chartData.labels.map((label, index) => ({
        label,
        price: chartData.datasets[0].data[index],
      }));

      const sortedData = combinedData.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

      const sortedLabels = sortedData.map(item => item.label);
      const sortedPrices = sortedData.map(item => item.price);

      setChartData({
        ...chartData,
        labels: sortedLabels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: sortedPrices,
          },
        ],
      });
    }
  }, [sortOrder]); // Sort data when sortOrder changes

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Prices from Fake Store API',
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: width, height: '400px' }}> {/* Apply custom width */}
      {chartData ? <Bar data={chartData} options={options} /> : <div>No data available</div>}
    </div>
  );
};

export default AttritionChart;
