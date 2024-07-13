import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FavouritePage from '../pages/FavouritePage';
import HomePage from '../pages/HomePage';

const MainContent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavouritePage />} />
      </Routes>
    </div>
  );
}

export default MainContent;
