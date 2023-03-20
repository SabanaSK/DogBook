import React, { useState } from 'react';
import './Create.css';
import FriendSelector from "../FriendSelector/FriendSelector.jsx";
import { v4 as uuidv4 } from 'uuid';
import GoBackButton from '../GoBack.jsx';

const CreateDogForm = () => {
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [isInYard, setIsInYard] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);

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

  const handleIsInYardChange = (event) => {
    setIsInYard(event.target.checked);
  };

  function handleFriendSelect(friends) {
    setSelectedFriends([...selectedFriends, ...friends]);
  }

  function handleRemoveFriend(friend) {
    const newSelectedFriends = selectedFriends.filter((selectedFriend) => selectedFriend.id !== friend.id);
    setSelectedFriends(newSelectedFriends);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const newDog = {
      id: uuidv4(),
      name: name,
      nick: nick,
      age: age,
      description: description,
      friends: selectedFriends.map(friend => friend.id), // only store friend ids in the new dog object
      isInYard: isInYard,
    };

    const dogs = JSON.parse(localStorage.getItem('dogs')) || [];
    const friendships = JSON.parse(localStorage.getItem('friendships')) || [];
    dogs.push(newDog);

    selectedFriends.forEach((friend) => {
      const existingFriendship = friendships.find((friendship) => (
        (friendship.dog1Id === friend.id && friendship.dog2Id === newDog.id) ||
        (friendship.dog1Id === newDog.id && friendship.dog2Id === friend.id)
      ));

      if (!existingFriendship) {
        const newFriendship = {
          id: uuidv4(),
          dog1Id: friend.id,
          dog2Id: newDog.id,
        };
        friendships.push(newFriendship);
      }
    });

    localStorage.setItem('dogs', JSON.stringify(dogs));
    localStorage.setItem('friendships', JSON.stringify(friendships));

    setShowSuccessMessage(true);
    setName('');
    setNick('');
    setAge('');
    setDescription('');
    setSelectedFriends([]);
    setIsInYard(false);
  };

  return (
    <>
      <GoBackButton />
      <div className='CreateDiv'>
        <h2>Create new dog</h2>
        {showSuccessMessage && <div className="successMessage">Dog created successfully!</div>}
        <form onSubmit={handleSubmit}>
          <label>
            *Name:
            <input type="text" value={name} onChange={handleNameChange} required />
          </label>
          <label>
            Present:
            <input type="checkbox" checked={isInYard} onChange={handleIsInYardChange} />
          </label>
          <br />
          <label>
            *Nick:
            <input type="text" value={nick} onChange={handleNickChange} required />
          </label>
          <br />
          <label>
            *Age:
            <input type="number" value={age} onChange={handleAgeChange} min="1" max="100" required />
          </label>
          <br />
          <label>
            Bio:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          {selectedFriends.length > 0 && (
            <div>
              <p>Selected friends:</p>
              <div className="selected-friends">
                {selectedFriends.map((friend) => (
                  <div key={friend.id}>
                    {friend.name}
                    <button onClick={() => handleRemoveFriend(friend)}>Remove</button>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          )}
          <br />
          <FriendSelector onFriendSelect={handleFriendSelect} selectedFriends={selectedFriends} />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateDogForm;
