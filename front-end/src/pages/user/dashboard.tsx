import React, { useEffect } from 'react';
import UserDashboard from '../../components/user-dashboard';

const Dashboard = () => {

    useEffect(()=>{
        document.title = 'Book-Store|User-dashboard';
    })
    return (
        <UserDashboard />
    );
};

export default Dashboard;
