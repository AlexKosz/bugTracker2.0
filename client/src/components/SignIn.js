import React from 'react';
import Reg from "./Reg"
import Login from "./Login"

const SignIn = () => {
    return (
        <div className="row">
            <div className="col">
                <Reg />
            </div>
            <div className="col">
                <Login />
            </div>

        </div>
    )
}

export default SignIn;