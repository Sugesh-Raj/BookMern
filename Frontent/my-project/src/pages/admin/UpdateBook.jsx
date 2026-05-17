import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import getBaseUrl from '../../utils/baseUrl';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`${getBaseUrl()}/api/books/${id}`);
                const data = await res.json();
                reset({ ...data, trending: data.trending ? "true" : "false" });
            } catch (e) {
                console.error("fetch issue", e)
            }
        };
        fetchBook();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            data.trending = data.trending === 'true';
            const response = await fetch(`${getBaseUrl()}/api/books/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setMessage('Book updated successfully!');
                setTimeout(() => navigate('/dashboard/manage-books'), 1500);
            } else {
                setMessage('Failed to update book.');
            }
        } catch (error) {
            setMessage('Network error.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Book Details</h2>
            {message && <p className={`mb-4 font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
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
                    <input {...register("coverImage", {required: true})} className="w-full border rounded p-2" />
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
                <button type="submit" className="bg-yellow-500 text-white font-bold py-2 px-6 rounded hover:bg-yellow-600 transition">Save Changes</button>
            </form>
        </div>
    );
};
export default UpdateBook;
