import React from "react";
import {nanoid} from "nanoid";

export default function Quiz(props){


    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const questionText= decodeEntities(props.quesStructure.question)

    const newArray = []
    const incorrectAnswers = props.quesStructure.incorrect_answers
    const correctAnswer = props.quesStructure.correct_answer
    newArray.push({value:correctAnswer,
                    isHeld: false,
                    correctChoice:true,
                id:nanoid()})
    for (let i=0;i<incorrectAnswers.length;i++){
        newArray.push({value:incorrectAnswers[i],
                        isHeld:false,
                        correctChoice:false,
                        id:nanoid()})
    }
    //if (!props.quizCompleted){
    shuffle(newArray)
  

    const [freshArray, setFreshArray] = React.useState(newArray)

    function holdChoice(id) {
        setFreshArray(oldArray => oldArray.map(array => {
            return array.id === id ? 
                {...array, isHeld: !array.isHeld} :
                {...array, isHeld: false}
        }))
    }


function decodeEntities(s){
    var str, temp= document.createElement('p');
    temp.innerHTML= s;
    str= temp.textContent || temp.innerText;
    temp=null;
    return str;
}


    const choicesAfteSubmission = freshArray.map(choice => {
        function determineColor(){
        if (choice.isHeld) {
            if (choice.id === freshArray.find(user => user.correctChoice === true).id){
                return "#94D7A2"
            }else{
                return "#F8BCBC"
            }
        }else if (choice.id === freshArray.find(user => user.correctChoice === true).id){
            return "#94D7A2"
        }else{
            return "white"
        }  }

        if (props.quizCompleted){
        const styles = {
            backgroundColor: determineColor()
        }
        return(
            <span style={styles} className="choices">
            {decodeEntities(choice.value)}
            </span>
        )}else{
            const styles = {
                backgroundColor: choice.isHeld ? "#D6DBF5" : "white"
            }
            return(
                <span style={styles} onClick={()=>holdChoice(choice.id)} className="choices">
                {decodeEntities(choice.value)}
                </span>
            )

        }
    })

    return(
        <div>
            <div className="questionBody">
                <h2 className="questionText">{questionText}</h2>
                <h3 className="choicesElements">{choicesAfteSubmission}</h3>
                <hr/>
            </div>
        </div>
    )
}