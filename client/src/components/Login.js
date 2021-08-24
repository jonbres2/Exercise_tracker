import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router'

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [errMsg, setErrMsg] = useState(null)
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', form, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.msg === "Successfully logged in with cookie!") {
                    navigate("/dashboard")
                }
                else {
                    setErrMsg(res.data.msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmitHandler}>
                {errMsg? <p className="text-danger">{errMsg}</p> : ""}
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChangeHandler} />
                </div>
                <br />
                <input type="submit" value="Log In" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default Login;