import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const NewBug = (props) => {
    const [formInfo, setFormInfo] = useState({
        project: "",
        description: "",
        priortiy: ""
    })

    const [errors, setErrors] = useState({

    })

    const changehandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })

    }

    const showFormInfo = (e) => {
        const newBug = formInfo;
        newBug.userId = props.userId;
        console.log(newBug)
    }

    const addBug = (e) => {
        e.preventDefault();
        const newBug = formInfo;
        newBug.userId = props.userId;
        axios.post('http://localhost:8000/api/bugs/add', formInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors)
                }
                else {
                    navigate("/dashboard")
                    props.setLoaded(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="mt-5 newBugCard">
            <h3>Add a bug here</h3>
            <form onSubmit={addBug}>
                <div className="form-group">
                    <label>Project name:</label>
                    <input type="text" className="form-control" name="project" onChange={changehandler} placeholder="My pokemon app" />
                    {errors.project ? <p className="text-danger">{errors.project.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea rows="3" className="form-control" name="description" onChange={changehandler} placeholder="When a user switches pokemon, their current pokemon is not added to their team" />
                    {errors.description ? <p className="text-danger">{errors.description.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Priority:</label>
                    <select name="priority" className="form-control" onChange={changehandler}>
                        <option value="">Priority:</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.priority ? <p className="text-danger">{errors.priority.message}</p> : ""}
                </div>
                <input type="submit" value="Add Bug" className="btn btn-primary mt-2" />
            </form>
            {/* <div onClick={showFormInfo}>
                <h1>Show form info</h1>
            </div> */}

        </div>
    );
};




export default NewBug;