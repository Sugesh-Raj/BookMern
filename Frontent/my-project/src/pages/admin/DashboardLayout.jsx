import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-colors">Overview</Link>
                    <Link to="/dashboard/add-new-book" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-colors">Add New Book</Link>
                    <Link to="/dashboard/manage-books" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-colors">Manage Books</Link>
                    <Link to="/dashboard/manage-orders" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-colors">Manage Orders</Link>
                </nav>
            </aside>
            <main className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium transition-colors text-sm">
                        Logout
                    </button>
                </header>
                <div className="p-8 overflow-y-auto flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
