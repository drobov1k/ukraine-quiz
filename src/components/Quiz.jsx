import React, { useState } from 'react';
import questionsData from '../data/questions-1.json';
import { Question } from './Question';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === questionsData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz finished! Your score is ${score + 1}/${questionsData.length}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <Question
      question={questionsData[currentQuestion]}
      index={currentQuestion}
      selectedOption={selectedOption}
      handleOptionChange={handleOptionChange}
      handleSubmit={handleSubmit}
    />
  );
};

export { Quiz };
