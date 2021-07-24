import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const BugCard = (props) => {
    const [errors, setErrors] = useState(false)
    const [solving, setSolving] = useState(false)
    const [headerClasses, setHeaderClasses] = useState()
    const [cardClasses, setCardClasses] = useState()


    const showBugInfo = (e) => {
        console.log(props.bug)
    }

    const toggleSolving = (e) => {
        solving === true ? setSolving(false) : setSolving(true)
    }



    const [solution, setSolution] = useState(null)

    const changehandler = (e) => {
        setSolution({
            [e.target.name]: e.target.value
        })
        console.log(solution)
    }

    const markSolved = (e) => {
        e.preventDefault();
        if (!solution || solution.length < 10) {
            setErrors("Solution Must be at least 10 characters")
        }
        else {
            let temp = cardClasses + " solvedAn"
            setCardClasses(temp)
        }
    }

    const changeInDb = () => {
        let bug = {};
        bug.solution = solution.solution;
        bug.priority = "Solved";
        console.log(bug)
        axios.put(`http://localhost:8000/api/bugs/update/${props.bug._id}`, bug, { withCredentials: true })
            .then(res => {
                console.log(res)
                props.setLoaded(false)
            })
            .catch(err => {
                console.log(err)
            })
    }



    useEffect(() => {
        props.bug.priority === "High"
            ? setHeaderClasses("card-header high text-white")
            : props.bug.priority === "Medium"
                ? setHeaderClasses("card-header medium text-white")
                : setHeaderClasses("card-header low text-white")
        setCardClasses("card mb-3 m-auto")




    }, [])


    return (

        <div class={cardClasses ? cardClasses : ""} style={{ textAlign: "left" }} onAnimationEnd={() => changeInDb()}>
            <div className={headerClasses ? headerClasses : ""}>Priority: {props.bug.priority}</div>
            <div class="card-body bg-white">
                <h5 class="card-title">{props.bug.project}</h5>
                <p class="card-text">{props.bug.description}</p>
                <button className="btn btn-primary mt-2 mb-2" onClick={toggleSolving}>{solving === true ? "Cancel..." : "Solve!"}</button>




                {solving === true
                    ? <form onSubmit={markSolved}>
                        {errors ? <p className="text-danger">{errors}</p> : ""}
                        <div className="form-group">
                            <input type="text" className="form-control" name="solution" onChange={changehandler} placeholder="Your Solution" />
                        </div>
                        <input type="submit" value="Submit Solution" className="btn btn-primary mt-2" />
                    </form>
                    : <div />
                }

            </div>
        </div>
    );
};




export default BugCard;