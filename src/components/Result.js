import { Container } from '@mui/system'
import React from 'react'
import './result.css'
const Result = (props) => {
    return (
        <>
            {/* <h2>You got {props.points} of {props.questionsCount}!</h2> */}

            <Container className='categoryGroup questionGroup' maxWidth="lg">
                <h2>
                    <div className=''>
                        <table>

                            <tr >
                                <th>Question</th>
                                <th>Right answer</th>
                                <th>You anwser</th>
                            </tr>

                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                        </table>
                    </div>
                </h2>
            </Container>

        </>
    )
}

export default Result