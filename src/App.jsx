import {Quiz} from './components';
import { useState} from "react";
import {Button, Container, Stack, IconButton} from "@mui/material";

import backgroundImage from "./assets/ukrayina-ukraine-ukraina.webp";

export const Type = {
  ALL: 'all',
  PART: 'part',
}

function App() {
  const [selected, setSelected] = useState(null);
  
  const handleSelect = (type) => {
    setSelected(type);
  }

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
   
  return (
    <Container style={{
      justifyContent: 'center',
      textAlign: 'center',
      ...containerStyle
    }}>
      {selected ? <Button variant="contained" color="error" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }} onClick={() => setSelected(null)}>На головну</Button> : null}
      <div style={overlayStyle} />
      <div style={{ zIndex: 1 }}>
      {selected ? <Quiz type={selected} /> : (
        <>
          <h3>Обери опцію навчання:</h3>
          <Stack spacing={2} direction="row" alignContent="center" justifyContent="center">
            <Button variant="contained" onClick={() => handleSelect(Type.PART)}>Імітація реального тесту</Button>
            <Button variant="outlined" onClick={() => handleSelect(Type.ALL)}>Всі питання</Button>
          </Stack>
        </>
      )}
    </div>
    </Container>
  )
}

export default App
