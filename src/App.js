import Questions from "./components/Questions";
import './components/style.css'
import { useState } from 'react'
import Category from "./components/Category";
import { FaBeer } from 'react-icons/fa';
import { FcBadDecision } from "react-icons/fc";
import { SiCloud66 } from "react-icons/si";

function App() {
  const [hidden, setHidden] = useState(true)
  const [getQuestions, setGetQuestions] = useState(false)
  const [getCategory, setCategory] = useState('')

  const goToPath = (child) => {
    setGetQuestions(false)
  }

  const fetchCategory = (child) => {
    
    setGetQuestions(true)
    setCategory(child.target.id)
   }

  return (
    <>
       <h2><FaBeer /><SiCloud66></SiCloud66></h2>
      {getQuestions?<Questions back={goToPath} category={getCategory}></Questions>:<Category getCategory={fetchCategory}></Category>}

    </>
  )
}
export default App;
