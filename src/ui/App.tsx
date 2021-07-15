import React from 'react';
import { LPAppBar } from './Menu';
import Uploader from './Uploader';
import { Container } from '@material-ui/core';

function App() {
  return (
    <div>
      <LPAppBar/>
      <Container maxWidth="sm">
        <Uploader/>
      </Container>

    </div>
  );
}

export default App;
