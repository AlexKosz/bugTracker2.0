import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Login = () => {
    const [formInfo, setFormInfo] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState(null);

    const changehandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })

    }

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', formInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.msg === "succ") {
                    navigate("/dashboard")
                }
                else {
                    setErrors(res.data.msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                {errors ? <p className="text-danger">{errors}</p> : ""}
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange={changehandler} />

                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={changehandler} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>


        </div>
    );
};

export default Login;