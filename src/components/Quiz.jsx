import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Question } from './Question';
import { Results } from './Results';
import { QuizType } from '../constants/quiz';
import { formatTime, shuffleArray } from '../utils/common';
import { questions as questionsData } from '../data';

export const Quiz = ({ type }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2700);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    let selectedQuestions;
    if (type === QuizType.Part) {
      selectedQuestions = shuffleArray(questionsData).slice(0, 20);
    } else {
      selectedQuestions = shuffleArray(questionsData);
    }
    setQuestions(selectedQuestions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    })));
  }, [type]);

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setShowResults(true);
    }
  }, [timeLeft]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
      setResult('correct');
    } else {
      setResult('incorrect');
    }

    setResults([
      ...results,
      {
        question: questions[currentQuestion].question,
        selectedOption,
        correctAnswer: questions[currentQuestion].answer,
        isCorrect,
      },
    ]);

    setTimeout(() => {
      setSelectedOption('');
      setResult(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResults) {
    return <Results results={results} score={score} totalQuestions={questions.length} />;
  }

  const getBackgroundColor = (index) => {
    const result = results.find((res) => res.question === questions[index].question);
    if (result) {
      return result.isCorrect ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
    }
    return 'transparent';
  };

  return (
    <Container style={{ padding: 0, boxSizing: 'content-box' }}>
      {type === QuizType.All && (
        <IconButton
          onClick={toggleDrawer(true)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'black',
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {type === QuizType.Part && (
        <Typography variant="h5" style={{ textAlign: 'center', margin: '20px 0' }}>
          Час: {formatTime(timeLeft)}
        </Typography>
      )}
      <Question
        question={questions[currentQuestion]}
        index={currentQuestion}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        handleSubmit={handleSubmit}
        result={result}
      />
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List style={{ width: '250px' }}>
          {questions.map((question, index) => (
            <ListItem
              button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              style={{ backgroundColor: getBackgroundColor(index) }}
            >
              <ListItemText primary={`Q${index + 1}: ${question.question}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  );
};
