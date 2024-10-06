import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaEdit } from 'react-icons/fa'
import { color } from 'framer-motion'
import { Modal } from 'antd'; // Import Ant Design Modal

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([])
  const [selectedDriver, setSelectedDriver] = useState('')
  const [editModal, setEditModal]=useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await axios.get('http://localhost:8080/users/drivers')
      setDrivers(response.data)
      setSelectedDriver(response.data[0]) 
    }
    fetchDrivers()
  }, [])

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver)
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      await axios.put(`http://localhost:8080/users/drivers/${selectedDriver.id}`, selectedDriver);
      setEditModal(false); // Close the modal after saving
      // Optionally, refetch drivers or update the state to reflect changes
      const response = await axios.get('http://localhost:8080/users/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  }

  return (
    <div className="flex">
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {drivers.map(driver => (
          <div key={driver.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={() => handleDriverClick(driver)}>
            <div className="flex justify-center items-center">
              <img src={driver.driver_image} alt="Profile Placeholder" className="w-16 h-16 rounded-full" />
            </div>
            <h2 className="text-xl font-bold">{driver.username}</h2>
            <p>Works since: {new Date(driver.created_at).toLocaleDateString()}</p>
            <p>Working hours:{driver.working_hours}</p>
            <p> <span className='px-2 rounded-md font-bold' style={{backgroundColor: driver.available === 1 ? 'rgb(187 247 208)' : 'lightcoral', color: driver.available === 1 ? 'darkgreen' : 'darkred'}}>{driver.available === 1 ? 'Available' : 'Not Available'}</span></p>

          <i className="fas fa-edit"></i>
          <div className="flex justify-between items-center mt-4">
            
            <button onClick={()=>setEditModal(true)} className="flex items-center">
              <FaEdit className="mr-2" /> Edit
            </button>
          
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(driver.id)}>
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
    
          </div>
        ))}
      </div>

      <Modal
        title="Edit Driver"
        visible={editModal}
        onCancel={() => setEditModal(false)}
        footer={null} // Disable default footer
      >
        <form onSubmit={handleSubmitEdit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" name="username" id="username" value={selectedDriver.username} onChange={(e) => setSelectedDriver({ ...selectedDriver, username: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="working_hours" className="block text-sm font-medium text-gray-700">Working Hours</label>
            <input type="text" name="working_hours" id="working_hours" value={selectedDriver.working_hours} onChange={(e) => setSelectedDriver({ ...selectedDriver, working_hours: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="available" className="block text-sm font-medium text-gray-700">Availability</label>
            <select id="available" name="available" value={selectedDriver.available} onChange={(e) => setSelectedDriver({ ...selectedDriver, available: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => setEditModal(false)} className="mr-4 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </form>
      </Modal>
      
      
      
      
      
      
      
    </div>
  )
}

export default ManageDrivers
