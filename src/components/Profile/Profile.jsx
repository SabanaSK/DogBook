import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    };
    fetchImage();

    const dogs = JSON.parse(localStorage.getItem('dogs')) || [];
    if (dogs.length > 0) {
      const dog = dogs.find((d) => d.id === id);
      setDog(dog);
    }
  }, [id]);

  return (
    <div className='profileDiv'>
      <img src={imageUrl} alt="DogsPhoto" />
      <div className='name'>
        <p>Name: {dog && dog.name}</p>
        <Link to={`/edit/${id}`}> Edit </Link>
      </div>
      <p>Nick: {dog && dog.nick}</p>
      <p>Age: {dog && dog.age}</p>
      <p>Bio: {dog && dog.description}</p>
      <p>In Yard: {dog && (dog.isInYard ? 'Yes' : 'No')}</p>
      <p>Friends:</p>
      {dog && dog.friends.map((friend) => (
        <Link key={friend.id} to={`/profile/${friend.id}`}>
          {friend.name}
        </Link>
      ))}
    </div>
  );
};

export default Profile;
