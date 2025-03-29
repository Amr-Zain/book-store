import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router'

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const currentUser = useAuth()?.currentUser;

    if(currentUser) {
        return children;
    }
    return <Navigate to="/login" replace/>
}

export default PrivateRoute