import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import CreateDogForm from './components/Create/Create.js';
import Profile from './components/Profile/Profile.js';
import Header from './components/Layout/TheHeader.js';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateDogForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
