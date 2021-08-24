import React from 'react';
import Registration from './Registration';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
    return (
        <div className="row">
            <div className="col">
                <Registration></Registration>
            </div>
            <div className="col">
                <Login></Login>
            </div>
        </div>
    );
};

export default SignIn;