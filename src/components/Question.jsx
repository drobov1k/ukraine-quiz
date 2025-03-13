import React from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const Question = ({ question, index, selectedOption, handleOptionChange, handleSubmit }) => {
  return (
    <Card style={{ marginBottom: '20px', width: '400px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`Q${index + 1}: ${question.question}`}
        </Typography>
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {question.options.map((option, i) => (
            <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export { Question };
