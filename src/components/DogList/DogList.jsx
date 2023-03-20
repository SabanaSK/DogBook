import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    const removedDog = newDogs.splice(index, 1)[0];
    setDogs(newDogs);
    localStorage.setItem('dogs', JSON.stringify(newDogs));

    const friendships = JSON.parse(localStorage.getItem('friendships')) || [];
    const newFriendships = friendships.filter((friendship) => (
      friendship.dog1Id !== removedDog.id && friendship.dog2Id !== removedDog.id
    ));
    localStorage.setItem('friendships', JSON.stringify(newFriendships));
  };


  const isInYard = (dog) => {
    return {
      color: dog.isInYard ? 'green' : 'red'
    };
  }


  return (
    <div className='DogListDiv'>
      <ul className='dogListUl'>
        {dogs.map((dog, index) => (
          <li key={index}>
            <Link to={`/profile/${dog.id}`} style={isInYard(dog)}>
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
