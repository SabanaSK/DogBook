import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { name } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [dogs, setDog] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    };
    fetchImage();

    const data = JSON.parse(localStorage.getItem('dogs')) || [];
    const foundDog = data.find((dogs) => dogs.name === name);
    setDog(foundDog);

  }, [name]);

  return (
    <div>
      <img src={imageUrl} alt="DogsPhoto" />
      <p>Name: {dogs.name}</p>
      <p>Nick: {dogs.nick}</p>
      <p>Age: {dogs.age}</p>
      <p>Bio: {dogs.description}</p>
      <p>Vänner:</p>
      <ul>
        {dogs.friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
