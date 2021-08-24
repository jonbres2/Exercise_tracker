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

    // Setting a default form state
    const [form, setForm] = useState({
        title: "",
        description: "",
        reward: null,
        creator: ""
    });

    // Setting a place to register validation errors
    const [errors, setErrors] = useState("");

    // On-change handler for form
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            creator: loggedUser._id
        })
    };

    // On-submit handler for form
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/workout/create', form, { withCredentials: true })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                }
                else {
                    navigate("/dashboard")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

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

                        <h1>Create new workout userID = {loggedUser._id}</h1>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title" onChange={onChangeHandler} />
                                {errors.title ? <p className="text-danger">{errors.title.message}</p> : ""}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="3" className="form-control" name="description" onChange={onChangeHandler} />
                                {errors.description ? <p className="text-danger">{errors.description.message}</p> : ""}
                            </div>
                            <div className="form-group">
                                <label>Reward Value (0 - 1000)</label>
                                <input type="number" className="form-control" name="reward" onChange={onChangeHandler} />
                                {errors.reward ? <p className="text-danger">{errors.reward.message}</p> : ""}
                            </div>
                            <br />
                            <input type="submit" value="Create" className="btn btn-primary" />
                        </form>
                    </div>
                </div>




                : <h1>Please log in to access this page</h1>}
        </div>
    );
};

export default Workouts;