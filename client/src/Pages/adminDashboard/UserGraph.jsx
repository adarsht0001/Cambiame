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
import axios from '../../Axios/axios';

function UserGraph() {
  const [userCount, setUserCount] = useState([]);
  useEffect(() => {
    axios.get('/admin/chart')
      .then((res) => {
        const counts = {};
        res.data?.forEach((user) => {
          const date = new Date(user.date).toLocaleDateString();
          counts[date] = counts[date] ? counts[date] + 1 : 1;
        });
        setUserCount(counts);
      })
      .catch((err) => console.log(err));
  }, []);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  const chartData = {
    labels: Object.keys(userCount),
    datasets: [
      {
        label: 'Number of Users Joined',
        data: Object.values(userCount),
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
        text: 'Users',
      },
    },
  };
  return (
    <div>
      <h2>User Count by Date</h2>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default UserGraph;
