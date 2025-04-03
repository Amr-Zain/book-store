import { useEffect } from 'react';
import UserDashboard from '../../components/userDashboardComponents';

const Dashboard = () => {

    useEffect(()=>{
        document.title = 'Book-Store|User-dashboard';
    })
    return (
        <UserDashboard />
    );
};

export default Dashboard;
