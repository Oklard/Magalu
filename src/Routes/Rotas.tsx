// Em src/Rotas.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import SucessoPage from '../Pages/SucessoPage';

const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/SucessoPage" Component={SucessoPage} />
      </Routes>
    </Router>
  );
};

export default Rotas;
