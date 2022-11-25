import React from 'react'
import { Container, TableHead, TableRow } from '@mui/material';

const Result = (props) => {
    return (
        <>
           <h2>You got {props.points} of {props.questionsCount}!</h2> 
        </>
    )
}

export default Result