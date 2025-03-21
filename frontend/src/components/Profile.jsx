import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, token, loading, error } = useSelector((state) => state.auth);

   useEffect(() => {
    if (token && !user) {
        dispatch(fetchUserProfile());
    }
}, [dispatch, token, user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Profile</h2>
                            {user ? (
                                <div>
                                    <p><strong>First Name:</strong> {user.user.first_name}</p>
                                    <p><strong>Last Name:</strong> {user.user.last_name}</p>
                                    <p><strong>Mobile:</strong> {user.user.mobile_number}</p>
                                    <p><strong>Email:</strong> {user.user.email}</p>
                                </div>
                            ) : (
                                <p>No profile data available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;