import React, { useState } from 'react';


const CreateDogForm = () => {
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [friends, setFriends] = useState('');
  const [isInYard, setIsInYard] = useState(false);

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
    setFriends(event.target.value)
  };

  const handleIsInYardChange = (event) => {
    setIsInYard(event.target.checked);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const newDog = {
      name: name,
      nick: nick,
      age: age,
      description: description,
      friends: friends.split(','),
      isInYard: isInYard,

    };

    const data = JSON.parse(localStorage.getItem('dogs')) || [];
    data.push(newDog);
    localStorage.setItem('dogs', JSON.stringify(data));


    setName('');
    setNick('');
    setAge('');
    setDescription('');
    setFriends('');
    setIsInYard(false);
  };

  return (
    <div>
      <h2>Lägg till hund</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Namn:
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
          <input type="text" value={age} onChange={handleAgeChange} required />
        </label>
        <br />
        <label>
          Bio:
          <input type="text" value={description} onChange={handleDescriptionChange} required />
        </label>
        <br />
        <label>
          Vänner:
          <input type="text" value={friends} onChange={handleFriendsChange} required />
        </label>
        <br />
        <button type="submit">Lägg till</button>
      </form>
    </div>
  );
};

export default CreateDogForm;
