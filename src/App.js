// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import BetaKeyPage from './components/BetaKeyPage';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/prompt-web-page' : '';

  return (
     <BrowserRouter basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beta_key" element={<BetaKeyPage />} />
        	<Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </div>
     </BrowserRouter>
  );
}

export default App;