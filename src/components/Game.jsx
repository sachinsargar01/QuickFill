// src/components/Game.jsx
import React, { useState, useEffect } from "react";
import Question from "./Question";
import Feedback from "./Feedback";
import { fetchQuestions } from "../api";

function Game() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions()
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  useEffect(() => {
    if (timeRemaining > 0 && !gameFinished) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining <= 0 && !gameFinished) {
      handleNextQuestion();
    }
  }, [timeRemaining, gameFinished]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const blanksFilled = currentQuestion.blanks.every(
        (blankIndex) =>
          userAnswers[currentQuestionIndex] &&
          userAnswers[currentQuestionIndex][blankIndex] !== undefined
      );
      setIsNextEnabled(blanksFilled);
    } else {
      setIsNextEnabled(false);
    }
  }, [userAnswers, currentQuestionIndex, questions]);

  const handleWordSelect = (blankIndex, word) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: {
        ...prevAnswers[currentQuestionIndex],
        [blankIndex]: word,
      },
    }));
  };

  const handleUnselectWord = (blankIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: {
        ...prevAnswers[currentQuestionIndex],
        [blankIndex]: undefined,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeRemaining(30);
    } else {
      calculateScore();
      setGameFinished(true);
    }
  };

  const calculateScore = () => {
    let currentScore = 0;
    questions.forEach((question, index) => {
      let questionCorrect = true;
      question.blanks.forEach((blankIndex, relativeIndex) => {
        if (
          !userAnswers[index] ||
          userAnswers[index][blankIndex] !==
            question.correctAnswers[relativeIndex]
        ) {
          questionCorrect = false;
        }
      });
      if (questionCorrect) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  return (
    <div className="container mx-auto mt-8">
      {gameFinished ? (
        <Feedback
          questions={questions}
          userAnswers={userAnswers}
          score={score}
        />
      ) : (
        questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            userAnswers={userAnswers[currentQuestionIndex]}
            onWordSelect={handleWordSelect}
            onUnselectWord={handleUnselectWord}
            timeRemaining={timeRemaining}
            onNext={handleNextQuestion}
            isNextEnabled={isNextEnabled}
          />
        )
      )}
    </div>
  );
}

export default Game;
