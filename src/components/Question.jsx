import React, { Fragment } from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { getResultColor } from '../utils/question';

export const Question = ({ question, index, selectedOption, handleOptionChange, handleSubmit, result }) => {
  return (
    <Card style={{ marginBottom: '20px', width: '400px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`Q${index + 1}: ${question.question}`}
        </Typography>
        <RadioGroup value={selectedOption} onChange={handleOptionChange} style={{ textAlign: 'left' }}>
          {question.options.map((option, i) => (
            <Fragment key={i}>
              <FormControlLabel value={option} control={<Radio />} label={option} />
              <hr style={{ width: question.options.length - 1 === i ? '0' : '100%' }} />
            </Fragment>
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '10px' }}
          disabled={selectedOption === '' || result !== null}
        >
          Підтвердити
        </Button>
        {result && (
          <Typography
            variant="h6"
            style={{
              marginTop: '10px',
              color: getResultColor(result),
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {result === 'correct' ? 'Правильна відповідь!' : 'Неправильна відповідь!'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
