import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Reg = () => {
    const [formInfo, setFormInfo] = useState({
        firstName: "",
        email: "",
        password: "",
        confirm: ""
    })

    const [errors, setErrors] = useState({

    })

    const changehandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })

    }

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', formInfo, { withCredentials: true })
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
            <h1>Register</h1>
            <form onSubmit={register}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" onChange={changehandler} />
                    {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange={changehandler} />
                    {errors.email ? <p className="text-danger">{errors.email.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={changehandler} />
                    {errors.password ? <p className="text-danger">{errors.password.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" onChange={changehandler} />
                    {errors.confirmPassword ? <p className="text-danger">{errors.confirmPassword.message}</p> : ""}
                </div>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>

        </div>
    );
};




export default Reg;