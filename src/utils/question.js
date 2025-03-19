export const getResultColor = (result) => {
  if (result === 'correct') {
    return 'green';
  } else if (result === 'incorrect') {
    return 'red';
  } else {
    return '';
  }
};
