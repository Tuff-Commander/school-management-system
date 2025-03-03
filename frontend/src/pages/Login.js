import React from "react";

    const Login = () => {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2Xl font-bold mb-6 text-center">EduManageNG</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Enter your email"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm">
                        Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
                    </p>
                </div>
            </div>
        );
    };

    export default Login;