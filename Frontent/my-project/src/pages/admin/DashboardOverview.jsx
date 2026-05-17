import React from 'react';

const DashboardOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700">Total Books</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">Manage library</p>
        </div>
        <div className="p-6 bg-white shadow rounded border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">Track deliveries</p>
        </div>
        <div className="p-6 bg-white shadow rounded border-l-4 border-teal-500">
          <h3 className="text-lg font-semibold text-gray-700">System Status</h3>
          <p className="text-xl font-bold text-teal-600 mt-2">IDS Secured ✅</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
