// src/components/Question.jsx
import React from 'react';

function Question({ question, userAnswers, onWordSelect, onUnselectWord, timeRemaining, onNext, isNextEnabled }) {
  const sentenceParts = [];
  let wordOptions = [];
  let lastIndex = 0;

  question.blanks.forEach((blankIndex, relativeIndex) => {
    sentenceParts.push(question.sentence.substring(lastIndex, blankIndex));
    sentenceParts.push(
      <span
        key={`blank-${blankIndex}`}
        onClick={() => onUnselectWord(blankIndex)}
        className="underline cursor-pointer"
      >
        {userAnswers && userAnswers[blankIndex] ? userAnswers[blankIndex] : '______'}
      </span>
    );
    lastIndex = blankIndex;
    wordOptions.push(question.options[relativeIndex]);
  });
  sentenceParts.push(question.sentence.substring(lastIndex));

  return (
    <div className="p-4">
      <p className="mb-4">{sentenceParts}</p>
      <p className="mb-4">Time Remaining: {timeRemaining} seconds</p>
      {wordOptions.map((optionSet, relativeIndex) => (
        <div key={`options-${relativeIndex}`} className="mb-4">
          {optionSet.map((word, wordIndex) => (
            <button
              key={`word-${wordIndex}`}
              onClick={() => onWordSelect(question.blanks[relativeIndex], word)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
            >
              {word}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={onNext}
        disabled={!isNextEnabled}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
}

export default Question;