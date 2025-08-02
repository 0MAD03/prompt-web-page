// App.js
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import BetaKeyPage from './components/BetaKeyPage';

function App() {
  return (
     <HashRouter hashType="hashbang">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beta_key" element={<BetaKeyPage />} />
        	<Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </div>
     </HashRouter>
  );
}

export default App;