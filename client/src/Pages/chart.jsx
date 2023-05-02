/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from '../Axios/axios';

function UserGraph() {
  const [userCount, setUserCount] = useState([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  useEffect(() => {
    axios.get('/admin/chart')
      .then((res) => {
        const counts = {};
        res.data.forEach((user) => {
          const date = new Date(user.date).toLocaleDateString();
          counts[date] = counts[date] ? counts[date] + 1 : 1;
        });
        setUserCount(counts);
      })
      .catch((err) => console.log(err));
  }, []);

  const chartData = {
    labels: [1, 2, 3],
    datasets: [
      {
        label: 'Number of Users',
        data: [1, 2, 5],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
    scales: {
      x: {
        type: 'category',
      },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  console.log(chartData, 'ss');
  console.log(userCount, 'ss');
  return (
    <div>
      <h2>User Count by Date</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default UserGraph;
