import React, { useState, useEffect } from 'react';

const Profile = ({ profile }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    };
    fetchImage();
  }, []);
  return (
    <div>
      <img src={imageUrl} alt="DogsPhoto" />
      <p>Name: {profile.name}</p>
      <p>Nick: {profile.nick}</p>
      <p>Age: {profile.age}</p>
      <p>Bio: {profile.description}</p>
      <p>Vänner:</p>
      <ul>
        {profile.friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
