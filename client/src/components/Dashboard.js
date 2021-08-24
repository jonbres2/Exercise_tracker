import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { navigate } from '@reach/router';
import { Accordion, Card } from "react-bootstrap";

const Dashboard = () => {
    // Collecting logged in user's info and enabling ability to log out
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
        .then(res => {
            console.log(res)
            setLoggedUser(res.data.user)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    const logout = (e) => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    // Collecting all available workouts
    const [workouts, setWorkouts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/workout')
            .then(res => {
                setWorkouts(res.data.workouts);
                setLoaded(true);
            });
    }, [loaded])
    
    return (
        <div>
            {loggedUser ?
                <div className="bg-light">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <div className="navbar-nav">
                                    <span className="navbar-brand mb-0 ms-1 me-4 h1">Welcome {loggedUser.firstName}</span>
                                    <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                                    <a className="nav-link" href="/workouts">Workouts</a>
                                    <a className="nav-link" href="/rewards">Rewards</a>
                                </div>
                                <div className="d-flex navbar-nav">
                                    <a onClick={logout} className="nav-link" href="/">Logout</a>
                                </div>
                            </div>
                        </nav>

                        <div className="row py-4 px-4">

                            <div className="col">
                                <Card>
                                    <Card.Header className="text-center py-2 fs-3 fw-bold bg-info">Workouts</Card.Header>
                                    <Accordion defaultActiveKey="0" >
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0" >
                                                Testing Tab 1
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>This is the body of the first test tab</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                Testing Tab 2
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>This is the body of the second test tab</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Card>
                            </div>

                            <div className="col">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>All workouts</Card.Title>
                                        {workouts.map((workout, index) => {
                                            return <p key={index}>{workout.title}</p>
                                        })}
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>




                : <h1>Please log in to access this page</h1>}
        </div>
    );
};

export default Dashboard;