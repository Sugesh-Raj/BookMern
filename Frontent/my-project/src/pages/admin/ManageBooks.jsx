import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getBaseUrl from '../../utils/baseUrl';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${getBaseUrl()}/api/books/`);
            const data = await res.json();
            setBooks(data);
        } catch (e) { console.error(e) }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await fetch(`${getBaseUrl()}/api/books/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchBooks();
        } catch (error) {
            console.error("Delete failed");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">Title</th>
                            <th className="px-4 py-2 border-b">Category</th>
                            <th className="px-4 py-2 border-b">Price</th>
                            <th className="px-4 py-2 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book) => (
                            <tr key={book._id} className="hover:bg-gray-50 border-b">
                                <td className="px-4 py-2">{book.title}</td>
                                <td className="px-4 py-2">{book.category}</td>
                                <td className="px-4 py-2">${book.newPrice}</td>
                                <td className="px-4 py-2 text-center space-x-2">
                                    <Link to={`/dashboard/update-book/${book._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</Link>
                                    <button onClick={() => handleDelete(book._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageBooks;
