import React from 'react';
import { Link } from 'react-router-dom';

const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Link to="#" onClick={handleGoBack}>Go Back</Link>
  );
};

export default GoBackButton;
