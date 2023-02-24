import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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
    <div>
      <ul>
        {dogs.map((dog, index) => (
          <li key={index}>
            <Link to="/profile"  >
              @{dog.name}
            </Link>
            <button onClick={() => removeDog(index)}>x</button>
          </li>
        ))}
      </ul>
      <Link to="/create" > <button>Skapa ny hund</button> </Link>
    </div>

  );
}

export default DogList;
