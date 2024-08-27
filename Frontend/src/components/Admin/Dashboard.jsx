import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement
);

const Dashboard = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        fill: true,
      },
      {
        label: 'Sales',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User and Sales Data (2024)',
      },
    },
  };

  const barData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 18000, 20000],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: '#34d399',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Quarterly Revenue',
      },
    },
  };

  const pieData = {
    labels: ['Direct', 'Referral', 'Social'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [55, 30, 15],
        backgroundColor: ['#f87171', '#60a5fa', '#34d399'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Traffic Sources',
      },
    },
  };

  return (
    <div className="p-8  min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
            <p className="text-3xl font-bold text-indigo-600">5,890</p>
          </div>
          <svg className="w-12 h-12 text-indigo-600" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 4H4v12h12V8h-2V4h-2zM4 20v-2h12v2H4z" fill="currentColor"/>
          </svg>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Sales</h2>
            <p className="text-3xl font-bold text-orange-600">$76,230</p>
          </div>
          <svg className="w-12 h-12 text-orange-600" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4 5h2v14H4zm4-2h2v16H8zm4 2h2v14h-2zm4-2h2v16h-2z" fill="currentColor"/>
          </svg>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">New Signups</h2>
            <p className="text-3xl font-bold text-green-600">345</p>
          </div>
          <svg className="w-12 h-12 text-green-600" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 3v18m-9-9l9-9 9 9-9 9" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

         {/* Additional Charts */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Quarterly Revenue</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Charts */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Traffic Sources</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Sales by Region</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <Line data={lineData} options={lineOptions} />
      </div>

   
    </div>
  );
};

export default Dashboard;
