import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import NewBug from "./NewBug"
import BugCard from "./BugCard"
import SolvedBugCard from "./SolvedBugCard"

const url = "https://pacific-everglades-12315.herokuapp.com"


const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [bugs, setBugs] = useState(null)
    const [solvedBugs, setSolvedBugs] = useState(null)
    const [loaded, setLoaded] = useState(null)
    const [bugsActive, setBugsActive] = useState("unsolved")

    //get logged in user info
    useEffect(() => {
        axios.get(`${url}/api/users/loggedin`, { withCredentials: true })
            .then(res => {
                console.log(res)
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err)
                navigate("/")
            })
    }, [])

    const toggleActiveBugs = () => {
        bugsActive === "unsolved" ? setBugsActive("solved") : setBugsActive("unsolved")
    }

    //get bugs
    useEffect(() => {
        axios.get(`${url}/api/bugs/get`, { withCredentials: true })
            .then(res => {
                console.log(res)
                const high = [], medium = [], low = [], solved = [];
                let bugs = res.data;

                for (let i = 0; i < bugs.length; i++) {
                    if (bugs[i].priority === "High") {
                        high.push(bugs[i])
                    }
                    else if (bugs[i].priority === "Medium") {
                        medium.push(bugs[i])
                    }
                    else if (bugs[i].priority === "Low") {
                        low.push(bugs[i])
                    }
                    else if (bugs[i].priority === "Solved") {
                        solved.push(bugs[i])
                    }
                }
                bugs = [...high, ...medium, ...low]
                setBugs(bugs)
                setSolvedBugs(solved)
            })
            .catch(err => {
                console.log(err)
            })
        setLoaded(true)
    }, [loaded])




    const logout = (e) => {
        axios.get(`${url}/api/users/logout`, { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(err => { console.log(err) })
    }


    return (
        <div className="row m-1">
            <div className="col-sm-4 mb-4">
                {userInfo
                    ? <div>
                        <div className="userInfo">
                            <h1>Welcome {userInfo.firstName}</h1>
                            <button className="btn btn-primary mt-2" onClick={logout}>Logout</button>
                        </div>
                        <NewBug userId={userInfo._id} setLoaded={setLoaded} />
                    </div>
                    : <div>
                        <h1>Loading</h1>
                    </div>
                }

            </div>

            <div className="col-sm-8">
                <div className="box flex">
                    <h2 className={bugsActive === "unsolved" ? "active clickable" : "inactive clickable"} onClick={toggleActiveBugs}><span>Unsolved</span></h2>
                    <h2>|</h2>
                    <h2 className={bugsActive === "solved" ? "active clickable" : "inactive clickable"} onClick={toggleActiveBugs}><span>Solved</span></h2>
                </div>
                {userInfo
                    ?

                    bugsActive === "solved"

                        ? solvedBugs && solvedBugs.length !== 0
                            ? solvedBugs.map((bug) =>
                                <SolvedBugCard key={bug._id} bug={bug} />)
                            : <div className="bg-white box">
                                <h1>You don't have any solved bugs!</h1>
                                <p>Go back and solve one now?</p>
                            </div>

                        : bugs && bugs.length !== 0
                            ? bugs.map((bug) =>
                                <BugCard key={bug._id} bug={bug} setLoaded={setLoaded} />)
                            : <div className="bg-white box">
                                <h1>You don't have any unsolved bugs!</h1>
                                <p>Consider adding one now?</p>
                            </div>





                    : <div>
                        <h1>Loading</h1>
                    </div>

                }
            </div>
        </div>

    )
};

export default Dashboard;