import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Registration = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState("")

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', form, { withCredentials: true })
            .then(res => {
                console.log(res)
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
            <h1>Registration</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" onChange={onChangeHandler} />
                    {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastName" onChange={onChangeHandler} />
                    {errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange={onChangeHandler} />
                    {errors.email ? <p className="text-danger">{errors.email.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChangeHandler} />
                    {errors.password ? <p className="text-danger">{errors.password.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" onChange={onChangeHandler} />
                    {errors.confirmPassword ? <p className="text-danger">{errors.confirmPassword.message}</p> : ""}
                </div>
                <br />
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default Registration;