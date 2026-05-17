import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../../utils/baseUrl';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${getBaseUrl()}/api/auth/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', result.token);
                setMessage('Login successful!');
                navigate('/dashboard');
            } else {
                setMessage(result.message || 'Invalid credentials');
            }
        } catch (error) {
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Admin Access</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Admin Email
                        </label>
                        <input 
                            {...register("username", { required: true })} 
                            type="text" name="username" id="username" placeholder="Email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">Email is required.</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            {...register("password", { required: true })} 
                            type="password" name="password" id="password" placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">Password is required.</p>}
                    </div>
                    {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Login to Dashboard
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-gray-500 text-xs">
                    ©2026 Admin Portal. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
