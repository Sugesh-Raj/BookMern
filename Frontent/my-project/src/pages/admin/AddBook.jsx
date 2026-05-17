import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import getBaseUrl from '../../utils/baseUrl';

const AddBook = () => {
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            data.trending = data.trending === 'true'; // parse boolean
            const response = await fetch(`${getBaseUrl()}/api/books/create-book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setMessage('Book added successfully!');
                reset();
            } else {
                setMessage('Failed to add book.');
            }
        } catch (error) {
            setMessage('Network error.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Book</h2>
            {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Title</label>
                    <input {...register("title", {required: true})} className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea {...register("description", {required: true})} className="w-full border rounded p-2" rows="3"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Category</label>
                        <input {...register("category", {required: true})} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Trending</label>
                        <select {...register("trending")} className="w-full border rounded p-2">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Cover Image URL</label>
                    <input {...register("coverImage", {required: true})} placeholder="https://example.com/image.jpg" className="w-full border rounded p-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Old Price ($)</label>
                        <input type="number" {...register("oldPrice")} step="0.01" className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">New Price ($)</label>
                        <input type="number" {...register("newPrice", {required: true})} step="0.01" className="w-full border rounded p-2" />
                    </div>
                </div>
                <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition">Add Book</button>
            </form>
        </div>
    );
};
export default AddBook;
