import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import LoadingScreen from "../../../components/LoadingScreen";

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return <LoadingScreen title="Loading your workspace" message="Checking your session and restoring your saved preparation data." />
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
