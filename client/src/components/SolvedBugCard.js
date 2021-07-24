import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const SolvedBugCard = (props) => {


    return (

        <div class="card mb-3 m-auto">
            <div className="card-header solved text-white">Solved</div>
            <div class="card-body bg-white">
                <h5 class="card-title">{props.bug.project}</h5>
                <h6>Problem: </h6>
                <p class="card-text">{props.bug.description}</p>
                <h6>Solution: </h6>
                <p class="card-text">{props.bug.solution}</p>
            </div>
        </div>
    );
};




export default SolvedBugCard;