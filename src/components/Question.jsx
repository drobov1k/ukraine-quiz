import React, { Fragment } from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { getResultColor } from '../utils/question';

function isSingleUrlOnly(string) {
  const urlPattern = /^(https?:\/\/[^\s]+)$/;
  return urlPattern.test(string);
}


export const Question = ({ question, index, selectedOption, handleOptionChange, handleSubmit, result }) => {
  const renderQuestionImages = () => {
    if (!question.questionImage) {
      return null;
    }
    const imagesArray = Array.isArray(question.questionImage) ? question.questionImage : [question.questionImage];
    return imagesArray.map((image, i) => (
      <img key={i} src={image} alt="question" style={{ width: '100%', marginBottom: '10px' }} />
    ));
  };
  
  return (
    <Card style={{ width: '400px', maxHeight: '82vh', overflow: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`Q${index + 1}: ${question.question}`}
        </Typography>
        {renderQuestionImages()}
        <RadioGroup value={selectedOption} onChange={handleOptionChange} style={{ textAlign: 'left' }}>
          {question.options.map((option, i) => (
            <Fragment key={i}>
              <FormControlLabel value={option} control={<Radio />} label={
                isSingleUrlOnly(option) ? (<img src={option} style={{ maxWidth: '100%' }} /> ) : option
              } />
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
