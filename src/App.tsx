import React from 'react';
import ImageAssests from './components/ImageAssets/ImageAssets';
import Stages from './components/Stages/Stages';
import StagesContainer from './components/StagesContainer/StagesContainer';

function App() {
  return (
    <div>
      <ImageAssests />
      <StagesContainer>
        <Stages />
      </StagesContainer>
    </div>
  );
}

export default App;
