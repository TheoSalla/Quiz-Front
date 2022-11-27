import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Button, Container, CircularProgress } from '@mui/material';
import { BiCheck } from "react-icons/bi";
import Result from './Result';

const Questions = (props) => {
  const effectRan = useRef(false);

  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState("")
  const [state, setState] = useState(false);
  const [currentQuestion, SetCurrentQuestion] = useState(0);
  const [random, SetRandom] = useState([]);
  const [points, SetPoints] = useState(0);
  const [finish, setFinish] = useState(false);
  const [loading, SetLoading] = useState(false);


  const newQuestion = (e) => {
    if (questions[currentQuestion].correctAnswer === e.value) {
      SetPoints(points + 1);
      console.log("Right answer!");
    }
    else {
      console.log("Wrong");
    }
    if (questions.length == currentQuestion + 1) {
      setState(false);
      setFinish(true);
    }
    else {
      SetCurrentQuestion(currentQuestion + 1);
      SetRandom(() => [...questions[currentQuestion + 1].incorrectAnswers, questions[currentQuestion + 1].correctAnswer]);
    }
  }

  const randomQuestions = () => {
    questions.forEach(item => console.log("ITEMS:" + item.incorrectAnswers));
    SetRandom(questions);
    random.forEach(i => console.log("RANDOM ITEM: " + i));
    console.log("Length: " + questions.length);

  }
  useEffect(() => {
    console.log("Length: " + questions.length);
    questions.forEach(item => console.log("ITEMS:" + item.incorrectAnswers))
    if (effectRan.current === false) {

      const getTasks = async () => {
        const questionsFromApi = await fetchQuestions();
        setQuestions(questionsFromApi)
        SetRandom(() => [...questionsFromApi[currentQuestion].incorrectAnswers, questionsFromApi[currentQuestion].correctAnswer]);
        setState(true);
        SetLoading(true);
      }
      getTasks();
      console.log(questions);
      console.log('Getting questions....');
      console.log("Length: " + questions.length);
      effectRan.current = true;
    }
  }, [randomQuestions])

  // Fetch Questions!
  const fetchQuestions = async () => {
    const res = await fetch(`https://localhost:7112/api/question?difficulty=medium&category=${props.category}&count=5`)
    const data = await res.json()
    return data;
  }
  return (
    <div hidden={props.hidden}>
      <Container className='categoryGroup questionGroup' maxWidth="lg">
        <div className='question' >
          <div hidden={loading} ><CircularProgress color='success' /></div>
          {state && <h2 className='currentQuestion'>{questions[currentQuestion].question}</h2>}
          {state && <div className='answers'>{random.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => <h3 className='answersChoose' key={value} value={value} onClick={() => newQuestion({ value })}>{value} </h3>)}</div>}<BiCheck hidden={false} ></BiCheck>
         
          {finish && <h2> <Result points={points} questionsCount={questions.length}></Result></h2>}
          <div className='btn' >
            <Button color='success' onClick={props.back}>Back</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Questions

