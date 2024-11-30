import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import DebugObserver from './components/common/DebugObserver';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      {process.env.NODE_ENV === 'development' && <DebugObserver />}
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

