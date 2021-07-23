import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            .then(res => {
                console.log(res)
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err)
                navigate("/")
            })
    }, [])

    const logout = (e) => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(err => { console.log(err) })
    }

    return (
        userInfo ?
            <div>
                <h1>Welcome {userInfo.firstName}</h1>
                <button onClick={logout}>Logout</button>
            </div> :
            <div>
                <h1>Loading</h1>
            </div>
    )
};

export default Dashboard;