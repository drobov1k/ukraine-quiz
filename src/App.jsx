import { useState } from 'react';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

import backgroundImage from './assets/ukrayina-ukraine-ukraina.webp';
import { QuizType } from './constants/quiz';
import { Quiz } from './components';
import { isMobile } from './utils/common';
import { default as TelegramIcon } from './assets/telegram-svgrepo-com.svg';

function App() {
  const [selected, setSelected] = useState(null);
  const [_test, setTest] = useState('');
  const [time, setTime] = useState('');
  const [questions, setQuestions] = useState('');
  const [passingRate, setPassingRate] = useState('');
  
  const [isAccurateSettings, setAccurateSettings] = useState(false);
  
  const mobile = isMobile();

  const handleSelect = (type) => {
    setSelected(type);
  };

  const handleTestChange = (event) => {
    setTest(event.target.value);
  };
   
  return (
    <Container style={{
      justifyContent: 'center',
      textAlign: 'center',
      ...containerStyle,
    }}>
      {!selected ? (
        <FormControl style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1, justifySelf: 'anchor-center', width: '360px' }}>
          <InputLabel id="test-type-label">Вибір тесту</InputLabel>
          <Select
            disabled
            variant="outlined"
            labelId="test-type-label"
            value={1}
            onChange={handleTestChange}
            label="Вибір тесту"
          >
            <MenuItem value={1}>Тестування знань Конституції України</MenuItem>
            <MenuItem value={2}>Ты лох</MenuItem>
          </Select>
        </FormControl>
      ) : null}
      {selected ? <Button variant="contained" color="error" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }} onClick={() => setSelected(null)}>На головну</Button> : null}
      <div style={overlayStyle} />
      <div style={{ zIndex: 1 }}>
        {selected ? <Quiz type={selected} /> : (
          <>
            <h3>Обери опцію навчання:</h3>
            <Stack spacing={2} direction={mobile ? 'column' : 'row'} alignContent="center" justifyContent="center">
              <Button variant="contained" onClick={() => handleSelect(QuizType.Part)}>Імітація реального тесту</Button>
              <Button variant="outlined" onClick={() => handleSelect(QuizType.All)}>Всі питання</Button>
              <Button disabled startIcon={<BuildIcon />} value="Точна настройка тесту" aria-label="Точна настройка тесту" onClick={() => setAccurateSettings(true)}>
                Точна настройка тесту
              </Button>
              {isAccurateSettings ? (
                <>
                  <br />
                  <div style={{ marginTop: '20px' }}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel htmlFor="time-input">Час на тест</InputLabel>
                      <input id="time-input" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <InputLabel htmlFor="questions-input">Кількість питань</InputLabel>
                      <input id="questions-input" type="number" value={questions} onChange={(e) => setQuestions(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <InputLabel htmlFor="passing-rate-input">Прохідний бал</InputLabel>
                      <input id="passing-rate-input" type="number" value={passingRate} onChange={(e) => setPassingRate(e.target.value)} />
                    </FormControl>
                  </div>
                </>
              ) : null}
            </Stack>
          </>
        )}
      </div>
      <a href="https://t.me/iamsadamhussein" target="_blank" rel="noopener noreferrer" style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        <img src={TelegramIcon} style={{ width: '30px', height: '30px' }} />
        Написати розробнику
      </a>
    </Container>
  );
}

export default App;

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `url(${backgroundImage})`,
  position: 'relative',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(5px)',
};
