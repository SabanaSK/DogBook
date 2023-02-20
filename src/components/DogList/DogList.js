import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function DogList() {
  const [dogs, setDogs] = useState([]);

  // Hämta data från LocalStorage när komponenten har laddats
  useEffect(() => {
    const data = localStorage.getItem('dogs');
    if (data) {
      setDogs(JSON.parse(data));
    }
  }, []);


  // Funktion för att ta bort en hund från listan
  const removeDog = (index) => {
    // Skapa newDogs array med spread operator för att unvika modifiera original data.
    const newDogs = [...dogs];
    newDogs.splice(index, 1);
    setDogs(newDogs);

    // Spara data till LocalStorage när en hund tas bort
    localStorage.setItem('dogs', JSON.stringify(newDogs));
  }

  const isInYard = (dog) => {
    return dog.isInYard ? 'green' : 'red';
  };

  // Rendera listan över hundar
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
