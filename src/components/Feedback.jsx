// src/components/Feedback.jsx
import React from "react";

function Feedback({ questions, userAnswers, score }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
      <p className="mb-4">
        Your Score: {score} / {questions.length}
      </p>
      {questions.map((question, index) => (
        <div key={`feedback-${index}`} className="mb-4">
          <p className="font-semibold">
            Question {index + 1}: {question.sentence}
          </p>
          {question.blanks.map((blankIndex, relativeIndex) => (
            <p key={`blank-feedback-${blankIndex}`}>
              Your Answer:{" "}
              {userAnswers[index] && userAnswers[index][blankIndex]
                ? userAnswers[index][blankIndex]
                : "Not Answered"}
              . Correct Answer: {question.correctAnswers[relativeIndex]}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Feedback;
