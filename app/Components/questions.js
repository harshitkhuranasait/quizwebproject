"use client";
import Image from "next/image";
import { useState,useEffect } from "react";
export default function Questions({setQuizstarted,listofquestions}) {
    const [currentquestion, setCurrentquestion] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [quizdone, setQuizdone] = useState(false);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    useEffect(() => {
        const correctAnswer = listofquestions[currentquestion].correct_answer;
        console.log("Correct answer is: " + correctAnswer);
        const incorrectAnswers = listofquestions[currentquestion].incorrect_answers;
        console.log("Earlier: " + incorrectAnswers);
        const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
        console.log("Random Index: " + randomIndex);
        incorrectAnswers.splice(randomIndex, 0, correctAnswer);
        setOptions([...incorrectAnswers]); // Use spread operator to create a new array
        console.log(options);
    }, [currentquestion, listofquestions]);
  return (
<div className="flex flex-col gap-1 justify-evenly w-full h-full  pt-3">
    {!quizdone ? 
    <>
<span
  className="font-semibold text-xl mt-12"
  dangerouslySetInnerHTML={{
    __html: `Q${currentquestion + 1}) ${listofquestions[currentquestion].question}`,
  }}
/>
    <div className="flex flex-col gap-1 items-center h-full justify-evenly ">
    {options.map((answer, index) => {
        return (
            <button
                key={index}
                className="bg-red-500 hover:bg-red-600 ease-in-out duration-200 w-full p-2 rounded-lg"
                onClick={() => {
                    if (answer == listofquestions[currentquestion].correct_answer) {
                        if (currentquestion == listofquestions.length - 1) {
                            setQuizdone(true);
                            setScore(score + 1);
                        } else {
                            setCurrentquestion(currentquestion + 1);
                            setScore(score + 1);
                        }
                    } else {
                        setWrongAnswers([
                            ...wrongAnswers,
                            { question: listofquestions[currentquestion], answer: answer },
                        ]);
                        if (currentquestion == listofquestions.length - 1) {
                            setQuizdone(true);
                        }
                        else{
                            setCurrentquestion(currentquestion + 1);
                        }
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html:`${answer}`}}
            >
            </button>
        );
    })}
    </div>
    </>
    :
    <div className="flex flex-col items-center w-full justify-evenly h-full">
    <span className=" w-full text-center text-3xl font-bold">Your Scored {score}/{listofquestions.length} ({(score/listofquestions.length)*100}%)</span>
    {wrongAnswers.length > 0 &&
    <div className="overflow-scroll mb-2 h-56">
        <span className="text-xl font-semibold">Wrong Answers:</span>
        <div className="flex flex-col gap-1 items-center w-full overflow-scroll">
            {wrongAnswers.map((item, index) => {
                return (
                    <div key={index} className="flex flex-col gap-1 m-5 w-full ">
                        <span className="text-base font-semibold" dangerouslySetInnerHTML={{
    __html:`Q${index + 1} ${item.question.question}`}}></span>
                        <span className=" text-sm font-light" dangerouslySetInnerHTML={{
    __html:`Your Answer: ${item.answer}`}}></span>
                        <span className="text-sm font-normal" dangerouslySetInnerHTML={{
    __html:`Correct Answer: ${item.question.correct_answer}`}}></span>
                    </div>
                );
            })}
        </div>
    </div>
         }
    <button className="bg-red-500 hover:bg-red-600 ease-in-out duration-200 w-1/2 p-2 rounded-lg" onClick={() => {
        setQuizstarted(false);
    }}>Start Again</button>
    </div>
}
    </div>
  );
}
