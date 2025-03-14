import React, { useEffect, useState } from 'react';
import { questions as questionsData } from '../data';
import { Question } from './Question';
import { Results } from './Results';
import { Type } from '../App';
import MenuIcon from '@mui/icons-material/Menu';
import {Typography, Container, IconButton, Drawer, List, ListItem, ListItemText} from '@mui/material';

const Quiz = ({ type }) => {
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
    if (type === Type.PART) {
      selectedQuestions = shuffleArray(questionsData).slice(0, 20);
    } else {
      selectedQuestions = shuffleArray(questionsData);
    }
    setQuestions(selectedQuestions);
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

  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
        isCorrect
      }
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResults) {
    return <Results results={results} score={score} totalQuestions={questions.length} />;
  }

  return (
    <Container style={{ padding: 0, boxSizing: 'content-box' }}>
      {type === Type.ALL && (
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
      {type === Type.PART && (
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
            <ListItem button key={index} onClick={() => setCurrentQuestion(index)}>
              <ListItemText primary={`Q${index + 1}: ${question.question}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  );
};

export { Quiz };
