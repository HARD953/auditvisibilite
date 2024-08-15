import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => { 
    const isAccess = localStorage.getItem("accessToken-audit-visibility")
    if(!isAccess){
        return <Navigate to="/" replace />
    }
    else{
        return children
    }
};

export default ProtectedRoute;
