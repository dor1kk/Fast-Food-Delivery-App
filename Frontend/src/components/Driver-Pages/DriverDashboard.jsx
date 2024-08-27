import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
} from 'chart.js';
import Navbar from '../layout/navbar';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
);

const DriverDashboard = () => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Deliveries Completed',
        data: [10, 25, 15, 30, 20, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [
      {
        label: 'Earnings',
        data: [500, 300, 200, 400],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart
  const pieChartData = {
    labels: ['On Time', 'Late', 'Cancelled'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
      },
    ],
  };

  // Summary Data
  const summaryData = {
    activeDeliveries: 8,
    completedDeliveries: 120,
    pendingDeliveries: 15,
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-500">Active Deliveries</h2>
            <p className="text-2xl font-bold text-gray-700">{summaryData.activeDeliveries}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-500">Completed Deliveries</h2>
            <p className="text-2xl font-bold text-gray-700">{summaryData.completedDeliveries}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-500">Pending Deliveries</h2>
            <p className="text-2xl font-bold text-gray-700" >{summaryData.pendingDeliveries}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Deliveries Completed</h2>
            <div className="h-64">
              <Line data={lineChartData} />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Earnings by Region</h2>
            <div className="h-64">
              <Bar data={barChartData} />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-2 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Delivery Status</h2>
            <div className="h-64">
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
