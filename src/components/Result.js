import { Container } from '@mui/system'
import React from 'react'
import './result.css'
const Result = (props) => {
    props.result('resultGroup questionGroup');
    return (
        <div className='showResult' >
            {/* <h2>You got {props.points} of {props.questionsCount}!</h2> */}
            <table className='test'>
                <tr >
                    <th>Question</th>
                    <th>Right answer</th>
                    <th>You anwser</th>
                </tr>
                {props.questions.map((q, i) => <tr> <td>{q.question}</td> <td>{q.correctAnswer}</td><td>{props.userAnswers[i]}</td></tr>)}
            </table>
            <p className='scoreDisplay'>You got {props.points} of {props.questions.length}!</p>
        </div>
    )
}
export default Result