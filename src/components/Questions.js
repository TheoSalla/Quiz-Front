import React from 'react'
import './questions.css'
import { useState, useEffect, useRef } from 'react'
import { Button, Container, CircularProgress } from '@mui/material';
import { BiCheck } from "react-icons/bi";
import Result from './Result';

const Questions = (props) => {
  const effectRan = useRef(false);
  const [questions, setQuestions] = useState([])
  const [state, setState] = useState(false);
  const [currentQuestion, SetCurrentQuestion] = useState(0);
  const [random, SetRandom] = useState([]);
  const [points, SetPoints] = useState(0);
  const [finish, setFinish] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [categoryStyle, setCategoryStyle] = useState('categoryGroup questionGroup');
  const [userAnswers, setUserAnswers] = useState([]);

  const showResult = (child) => {
    console.log(child);
    setCategoryStyle(child);
  }

  const newQuestion = (e) => {

    setUserAnswers(() => [...userAnswers, e.value]);

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
  // Fetch Questions
  const fetchQuestions = async () => {
    // const res = await fetch(`https://localhost:7112/api/question?difficulty=medium&category=${props.category}&count=10`)
    // const res = await fetch(`http://localhost:5249/api/question?difficulty=medium&category=${props.category}&count=10`)
    // const res = await fetch(`http://127.0.0.1:5249/api/question?difficulty=medium&category=${props.category}&count=10`)
    const res = await fetch(`http://localhost:5249/api/question?difficulty=medium&category=${props.category}&count=10`, { credentials: 'include', headers: {
      'Access-Control-Allow-Credentials': true
    }})
    const data = await res.json()
    return data;
  }
  return (
    <div hidden={props.hidden}>
      <Container className={categoryStyle} maxWidth="lg">
        <div className='question' >
          <div hidden={loading} ><CircularProgress color='success' /></div>
          {state && <h2 className='currentQuestion'>{questions[currentQuestion].question}</h2>}
          {state && <div className='answers'>{random.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => <h3 className='answersChoose' key={value} value={value} onClick={() => newQuestion({ value })}>{value} </h3>)}</div>}<BiCheck hidden={false} ></BiCheck>
          {finish && <Result userAnswers={userAnswers} questions={questions} result={showResult} points={points}></Result>}
          <div className='blop' >
            <div  className='backBtn' onClick={props.back}>Back</div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Questions


// style={{height: "700px"}}

// categoryGroup questionGroup