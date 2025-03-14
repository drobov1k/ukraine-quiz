import React from 'react';
import { Card, CardContent, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

const Results = ({ results, score, totalQuestions }) => {
  const passed = score >= 15;

  return (
    <Container style={{
      marginTop: '20px',
      position: 'absolute',
      maxHeight: 'calc(100vh - 100px)',
      left: 0,
      top: '80px',
      bottom: '20px',
      background: 'inherit',
      overflow: 'auto'
    }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ваш результат: {score}/{totalQuestions}
          </Typography>
          <Typography variant="h5" style={{ color: passed ? 'green' : 'red' }} gutterBottom>
            {passed ? 'Здав тест!!!' : 'Тест не зданий 🤯'}
          </Typography>
          <List>
            {results.map((result, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Q${index + 1}: ${result.question}`}
                  secondary={`Ваша відповідь: ${result.selectedOption}, Правильна відповідь: ${result.correctAnswer}`}
                  style={{ color: result.isCorrect ? 'green' : 'red' }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export { Results };
