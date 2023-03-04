import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './DogList.css';


function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('dogs');
    if (data) {
      setDogs(JSON.parse(data));
    }
  }, []);

  const removeDog = (index) => {

    const newDogs = [...dogs];
    newDogs.splice(index, 1);
    setDogs(newDogs);
    localStorage.setItem('dogs', JSON.stringify(newDogs));
  }

  const isInYard = (dog) => {
    return dog.isInYard ? 'green' : 'red';
  };


  return (
    <div className='DogListDiv'>
      <ul className='dogListUl'>
        {dogs.map((dog, index) => (
          <li
            key={index}
            style={{ color: dog.isInYard ? 'green' : 'red' }}>
            <Link to={`/profile/${dog.id}`}>
              {dog.name}
            </Link>
            <button onClick={() => removeDog(index)}> Remove </button>
          </li>
        ))}
      </ul>
      <Link to="/create" > <button className='CreateNewDog'>Create new dog</button> </Link>
    </div>
  );
}

export default DogList;
