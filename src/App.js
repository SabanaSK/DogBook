import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import CreateDogForm from './components/Create/Create.js';
import Profile from './components/Profile/Profile.js';


const App = () => {
  return (
    <div>
      <h1>Hunddagis Adminverktyg</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateDogForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
