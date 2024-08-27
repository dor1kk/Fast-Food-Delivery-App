import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';

const Profile = () => {
    const { user } = useContext(AuthContext);


  return (
    <div className="flex flex-col h-screen ">
        <Navbar />
    <div className='flex flex-row'>
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover"
          />
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
            Update Picture
          </button>
        </div>
        {user && 
          <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">{user?.email || "User Name"}</h2>
          <p className="text-gray-600">{user?.role || "User"}</p>
        </div> }
      
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {['New Bookings', 'Cancellation', 'Due Payment', 'Maintenance'].map((label) => (
            <div className="flex items-center justify-between mt-4" key={label}>
              <span className="text-gray-700">{label}</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-2/3 lg:w-3/4 bg-white p-6 rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <a className="text-indigo-600 border-indigo-600  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm" href="#">Profile Settings</a>

            </nav>
          </div>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={user?.username || ""}
                placeholder="First Name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={user?.lastName || ""}
                placeholder="Last Name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={user?.email || ""}
                placeholder="Email Address"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={user?.phoneNumber || ""}
                placeholder="Phone Number"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-lg">Save</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Profile;