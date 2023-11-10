import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SucessoPage from '../Pages/SucessoPage';
import LoginPage from '../Pages/LoginPage';

const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/SucessoPage" Component={SucessoPage} />
      </Routes>
    </Router>
  );
};

export default Rotas;
