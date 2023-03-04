import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [dogs, setDog] = useState(null);

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
    console.log('dogs:', dogs);
  }, [id]);

  return (
    <div className='profileDiv'>
      <img src={imageUrl} alt="DogsPhoto" />
      <div className='name'>
        <p>Name: {dogs && dogs.name}</p>
        <Link to={`/edit/${id}`}> Edit </Link>
      </div>
      <p>Nick: {dogs && dogs.nick}</p>
      <p>Age: {dogs && dogs.age}</p>
      <p>Bio: {dogs && dogs.description}</p>
      <p>Friends:</p>
      <ul>
        {dogs && dogs.friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
