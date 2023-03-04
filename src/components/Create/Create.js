import React, { useEffect, useState } from 'react';
import './Create.css';
import { v4 as uuidv4 } from 'uuid';

const CreateDogForm = () => {
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [friends, setFriends] = useState([]);
  const [isInYard, setIsInYard] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [allFriends, setAllFriends] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dogs')) || [];
    const allFriends = data.map((dog) => dog.name);
    setAllFriends(allFriends);
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNickChange = (event) => {
    setNick(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFriendsChange = (event) => {
    const selectedFriends = event.target.value
      .split(',')
      .map((friend) => friend.trim())
      .filter((friend) => allFriends.includes(friend));
    setFriends(selectedFriends);
  };

  const handleIsInYardChange = (event) => {
    setIsInYard(event.target.checked);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const newDog = {
      id: uuidv4(),
      name: name,
      nick: nick,
      age: age,
      description: description,
      friends: friends,
      isInYard: isInYard,

    };

    const data = JSON.parse(localStorage.getItem('dogs')) || [];
    data.push(newDog);

    localStorage.setItem('dogs', JSON.stringify(data));

    setShowSuccessMessage(true);
    setName('');
    setNick('');
    setAge('');
    setDescription('');
    setFriends([]);
    setIsInYard(false);

  };
  return (
    <div className='CreateDiv'>
      <h2>Create new dog</h2>
      {showSuccessMessage && <div className="successMessage">Dog created successfully!</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <label>
          In Yard:
          <input type="checkbox" checked={isInYard} onChange={handleIsInYardChange} />
        </label>
        <br />
        <label>
          Nick:
          <input type="text" value={nick} onChange={handleNickChange} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} min="0" max="100" required />
        </label>
        <br />
        <label>
          Bio:
          <textarea value={description} onChange={handleDescriptionChange} required />
        </label>
        <br />
        <label>
          Friends:
          <input type='text' value={friends} onChange={handleFriendsChange} />
          <ul>
            {friends.map((friend) => (
              <li key={friend}>
                <a href={`/friends/${friend}`}>{friend}</a>
              </li>
            ))}
          </ul>
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateDogForm;
