import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { navigate } from '@reach/router';

const Workouts = () => {
    // Verifying if (and what) user is logged in
    const [loggedUser, setLoggedUser] = useState(null);

    // Collecting the logged in user and setting that user in State
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            .then(res => {
                setLoggedUser(res.data.user)
            })
            .catch(err => {
                console.log(err)
            })
    }, [loggedUser]);

    // Clearing User's cookie and returning to login/registration page
    const logout = (e) => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    };

    
    return (
        <div>
            {loggedUser ?
                <div>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <div className="navbar-nav">
                                    <span className="navbar-brand mb-0 ms-1 me-4 h1">Welcome {loggedUser.firstName}</span>
                                    <a className="nav-link" href="/dashboard">Dashboard</a>
                                    <a className="nav-link active" aria-current="page" href="/workouts">Workouts</a>
                                    <a className="nav-link" href="/rewards">Rewards</a>
                                </div>
                                <div className="d-flex navbar-nav">
                                    <a onClick={logout} className="nav-link" href="/">Logout</a>
                                </div>
                            </div>
                        </nav>

                        <a href="/workouts/new" className="btn btn-primary">Create new workout</a>
                    </div>
                </div>




                : <h1>Please log in to access this page</h1>}
        </div>
    );
};

export default Workouts;