import React, { useEffect, useState } from 'react';
import getBaseUrl from '../../utils/baseUrl';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${getBaseUrl()}/api/orders/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if(Array.isArray(data)) setOrders(data);
        } catch (e) { console.error(e) }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await fetch(`${getBaseUrl()}/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchOrders();
        } catch (error) {
            console.error("Status update failed");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Manage Customer Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">Order ID</th>
                            <th className="px-4 py-2 border-b">Customer</th>
                            <th className="px-4 py-2 border-b">Total</th>
                            <th className="px-4 py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 border-b">
                                <td className="px-4 py-2 text-sm text-gray-500">{order._id.substring(18)}</td>
                                <td className="px-4 py-2">{order.name} <br/><span className="text-xs text-gray-500">{order.email}</span></td>
                                <td className="px-4 py-2 font-semibold text-green-600">${order.totalPrice}</td>
                                <td className="px-4 py-2">
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`border rounded p-1 font-semibold outline-none ${order.status === 'delivered' ? 'text-green-600 border-green-600 bg-green-50' : 'text-orange-500 border-orange-500 bg-orange-50'}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageOrders;
