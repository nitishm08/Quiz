import './App.css';
import Quiz from './components/Quiz';
import React from 'react';
import {nanoid} from "nanoid"
import GlobalState from './GlobalState.js'; 

function App() {

  //const [questionsArray, setQuestionsArray] = React.useState()

const [questions, setQuestions] = React.useState([])

const [quizCompleted, setQuizCompleted] =React.useState(false)
const [state, setState] = React.useState({})


/*function getQuestions() {
  const question = questions.question
  const correctAnswers= questions.correct_answer
  const incorrectAnswers= questions.incorrect_answers
  setQuestions(prevQuestions => ({
      ...prevQuestions,
      question: question
  }))
  
}*/

function showAnswers(){
  setQuizCompleted(prevResponse => !prevResponse)
}

React.useEffect(() => {
  fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
      setQuestions(prevQuestion => prevQuestion.map(ques=>(
        {...ques,id:nanoid(),quizCompleted:false})
       ))
}, [])

console.log(questions)

const questionsArray = questions.map(ques => {
  return(
    <GlobalState.Provider value={[state, setState]}>
  <Quiz
  //questionName = {ques.question}
  //correctAnswer = {ques.correct_answer}
  //incorrectAnswers = {ques.incorrect_answers}
  quesStructure = {ques}
  quizCompleted = {quizCompleted}
  key= {ques.id}
  />
  </GlobalState.Provider>
)})

  return (
    
    <main>{
      true ? 
      <div>
        <div className='blobs'>
        <div className='blob1'></div>
        <div className='blob2'></div>
      </div>
      <div className='quizContainer'>
      {questionsArray}
      </div>
      <button onClick = {showAnswers} className='submit'>{quizCompleted ? `You got ${state.count} / 5 correct`:"Check Answers"}</button>
      </div>
      :
      <div>
      <div className='blobs'>
        <div className='blob1'></div>
        <div className='blob2'></div>
      </div>
      <header>
        <h1>Quizzical</h1>  
        <h2>Some Description to add</h2>
        <button>Start Quiz</button>
      </header>
      </div>
}
    </main>
    
  );
}

export default App;
