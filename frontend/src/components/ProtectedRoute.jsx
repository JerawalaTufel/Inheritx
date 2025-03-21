import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        console.log('Redirecting to login...');
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;