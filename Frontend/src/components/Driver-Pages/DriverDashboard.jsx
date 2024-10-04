import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { FaTruck, FaMoneyBillWave, FaStar, FaClipboardList, FaChartLine, FaMapMarkedAlt } from 'react-icons/fa';
import Navbar from '../layout/navbar';

ChartJS.register(ArcElement, Tooltip, Legend, Title, LineElement, BarElement, CategoryScale, LinearScale, PointElement);

const DriverDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Deliveries',
        data: [10, 25, 15, 30, 20, 40, 35],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Earnings ($)',
        data: [50, 125, 75, 150, 100, 200, 175],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [
      {
        label: 'Deliveries by Region',
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'],
    datasets: [
      {
        data: [300, 50, 100, 20, 10],
        backgroundColor: [
          '#4CAF50',
          '#8BC34A',
          '#FFC107',
          '#FF9800',
          '#F44336',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const summaryData = {
    totalDeliveries: 152,
    totalEarnings: 760,
    averageRating: 4.8,
    completionRate: 98,
  };

  const recentDeliveries = [
    { id: 1, address: '123 Main St', status: 'Completed', earnings: 15 },
    { id: 2, address: '456 Elm St', status: 'In Progress', earnings: 12 },
    { id: 3, address: '789 Oak St', status: 'Completed', earnings: 18 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Driver Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <SummaryCard icon={<FaTruck />} title="Deliveries" value={summaryData.totalDeliveries} color="bg-white text-gray-400" />
          <SummaryCard icon={<FaMoneyBillWave />} title="Earnings" value={`$${summaryData.totalEarnings}`} color="bg-white text-gray-400" />
          <SummaryCard icon={<FaStar />} title="Avg Rating" value={summaryData.averageRating} color="bg-white text-gray-400" />
          <SummaryCard icon={<FaClipboardList />} title="Completion" value={`${summaryData.completionRate}%`} color="bg-white text-gray-400" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Performance Overview" chart={
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          } />
          <ChartCard title="Deliveries by Region" chart={
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          } />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RecentDeliveriesCard deliveries={recentDeliveries} />
          </div>
          <ChartCard title="Rating Distribution" chart={
            <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          } />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard icon={<FaChartLine />} title="View Detailed Analytics" description="Get in-depth insights" />
          <QuickActionCard icon={<FaMapMarkedAlt />} title="Update Availability Zone" description="Modify delivery areas" />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, value, color }) => (
  <div className={`${color} text-white p-4 rounded-lg shadow-md`}>
    <div className="flex items-center mb-2">
      <div className="text-2xl mr-2">{icon}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, chart }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="h-64">{chart}</div>
  </div>
);

const RecentDeliveriesCard = ({ deliveries }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">Recent Deliveries</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id} className="border-b">
              <td className="p-2">{delivery.id}</td>
              <td className="p-2">{delivery.address}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  delivery.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {delivery.status}
                </span>
              </td>
              <td className="p-2">${delivery.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const QuickActionCard = ({ icon, title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-50 transition duration-300">
    <div className="text-2xl mr-3 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

export default DriverDashboard;
